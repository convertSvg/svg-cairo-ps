#include <node.h>
#include <v8.h>
#include <cairo.h>
#include <png.h>
#include <cairo-svg.h>
#include <cairo-ps.h>
#include <cairo-pdf.h>
#include <math.h>

namespace helloWorld {

  using namespace v8;
  using v8::Exception;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::NewStringType;
  using v8::Object;
  using v8::String;
  using v8::Array;
  using v8::Number;
  using v8::Value;


  // stroke、fill之后会重新创建路径
  void draw (cairo_t *cr, const char *type, double d[]){
      // cairo_move_to(cr, 0, 0);
      // cairo_set_source_rgb (cr, 0.69, 0.19, 0);
      // cairo_set_line_width (cr, 30);
      // cairo_line_to(cr, 100, 100);

      // char and char * exchange
      char typeP = *type;
      switch(typeP){
        case 'M' :
          cairo_move_to(cr, d[0], d[1]);
          break;
        case 'm' :
          cairo_rel_move_to(cr, d[0], d[1]);
          break;
        case 'L' :
          cairo_line_to(cr, d[0], d[1]);
          break;
        case 'l' :
          cairo_rel_line_to(cr, d[0], d[1]);
          break;
        case 'Z' :
        case 'z' :
          cairo_close_path(cr);
          break;
        case 'C' :
          cairo_curve_to(cr, d[0], d[1], d[2], d[3], d[4], d[5]);
          break;
        case 'c' :
          cairo_rel_curve_to(cr, d[0], d[1], d[2], d[3], d[4], d[5]);
          break;
        case 'A' :
        case 'a' :
          cairo_save(cr);

          // d = [x1, y1, rotation, sweepFlag, radii_ratio, xc, yc, rx, startAngle, endAngle]
          cairo_translate(cr, d[0], d[1]);
          cairo_rotate(cr, d[2]);
          cairo_scale (cr, 1, d[4]);
          // sweep equal to 1 is cairo_arc， equal to 0 is cairo_arc_negative
          if( d[3] == 1 ){
            cairo_arc(cr, d[5], d[6], d[7], d[8], d[9]);
          } else {
            cairo_arc_negative(cr, d[5], d[6], d[7], d[8], d[9]);
          }
          cairo_restore (cr);
          break;
      }
  }


  int cairo_factory (const char *file_name, const char *format_value, const int size,  Local<Array> path_value, Isolate* isolate){
    // env
      cairo_surface_t *surface;
      cairo_t *cr;

      int width = size;
      int height = size;

      if (strcmp(format_value, "svg") == 0) {
        surface = cairo_svg_surface_create (file_name, width, height);
      } else if(strcmp(format_value, "ps") == 0){
        surface = cairo_ps_surface_create (file_name, width, height);
      } else if(strcmp(format_value, "pdf") == 0){
        surface = cairo_pdf_surface_create (file_name, width, height);
      } else if(strcmp(format_value, "png") == 0){
        surface = cairo_image_surface_create (CAIRO_FORMAT_ARGB32, width, height);
      } else {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "This format is not supported")));
        return 0;
      }

      cr = cairo_create (surface);

      int len = path_value->Length();

      for(int i = 0 ; i < len; i++ ) {
          Local<Object> obj = Local<Object>::Cast(path_value->Get(i));
          Local<String> mode_value = Local<String>::Cast(obj->Get(String::NewFromUtf8(isolate, "mode")));
          String::Utf8Value mode(isolate, mode_value);
          std::string modessr(*mode, mode.length());
          const char *style = modessr.data();

          Local<Array> d = Local<Array>::Cast(obj->Get(String::NewFromUtf8(isolate, "d")));
          int dlen = d->Length();

          // colors
          Local<Array> color_value = Local<Array>::Cast(obj->Get(String::NewFromUtf8(isolate, "color")));
          int clen = color_value->Length();
          double colors [clen];
          for(int c = 0; c < clen; c++ ) {
            double cc = color_value->Get(c)->NumberValue();
            colors[c] = cc;
          }

          cairo_set_source_rgba (cr, colors[0], colors[1], colors[2], colors[3]);

          for(int j = 0 ; j < dlen; j++ ) {
            Local<Object> data = Local<Object>::Cast(d->Get(j));

            // get Type
            Local<String> type_value = Local<String>::Cast(data->Get(String::NewFromUtf8(isolate, "type")));
            String::Utf8Value typevalue(isolate, type_value);
            std::string ststype(*typevalue, typevalue.length());
            const char *type = ststype.data();
            // printf("获取路径类型on = %s \n", type);
            // get paths
            Local<Array> paths = Local<Array>::Cast(data->Get(String::NewFromUtf8(isolate, "args")));

            // V8 类型数组转换 C 语言数组
            int plen = paths->Length();
            double path_ds [plen];
            for(int z = 0 ; z < plen; z++ ) {
              double dp = paths->Get(z)->NumberValue();
              path_ds[z] = dp;
              // printf("获取路径值值on = %f \n", dp);
            }

            draw (cr, type, path_ds);
          }

          // cairo_set_fill_rule (cr, CAIRO_FILL_RULE_EVEN_ODD);
          if (strcmp(style, "stroke") == 0) {
            cairo_set_line_width (cr, 1);
            cairo_stroke (cr);
          } else {
            cairo_fill (cr);
          }
      }

      /* Write output and clean up */
      if(strcmp(format_value, "png") == 0){
        cairo_surface_write_to_png(surface, file_name);
      }

      cairo_destroy (cr);
      cairo_surface_destroy (surface);

    return 0;
  };


  static void Parse(const FunctionCallbackInfo<Value>& args) {

    // isolate当前的V8执行环境，每个isolate执行环境相互独立
    Isolate* isolate = args.GetIsolate();

    // 参数数量检测
    if (args.Length() != 2) {
        isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate, "Wrong number of arguements")));
        return;
    }

    Local<Value> arg1 = args[0];
    Local<Value> arg2 = args[1];

    // 参数类型检测
    if (!arg1->IsString() || !arg2->IsObject()) {
        //抛出错误
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "argumnets type is incorrect")));
        return;
    }

    // javascript 字符串转为char*
    Local<String> file = Local<String>::Cast(arg1);
    String::Utf8Value value(isolate, file);
    std::string stssr(*value, value.length());
    const char *file_name = stssr.data();

    // js Object 类型转换成 v8 Object 类型
    Local<Object> path_object = Local<Object>::Cast(arg2);

    // 根据 key 获取对象中的值
    Local<Number> size_value = Local<Number>::Cast(path_object->Get(String::NewFromUtf8(isolate, "size")));
    Local<String> type_value = Local<String>::Cast(path_object->Get(String::NewFromUtf8(isolate, "type")));
    Local<Array> path_value = Local<Array>::Cast(path_object->Get(String::NewFromUtf8(isolate, "paths")));

    int size = size_value->NumberValue();

    String::Utf8Value format(isolate, type_value);
    std::string formatssr(*format, format.length());
    const char *format_value = formatssr.data();

    // 路径长度检测
    if (path_value -> Length() == 0) {
        isolate->ThrowException(Exception::TypeError(
                String::NewFromUtf8(isolate, "No paths")));
        return ;
    }

    cairo_factory(file_name, format_value, size, path_value, isolate);
    // printf("%d, %f %f\n", path_value->Length(), path_value->Get(0)->NumberValue(), path_value->Get(1)->IntegerValue());

    // args.GetReturnValue().Set(size_value);
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, file_name));
    // args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello, World!"));
  }

  static void init(Local<Object> exports) {
    // exports.Parse = { parse}
    NODE_SET_METHOD(exports, "parse", Parse);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}

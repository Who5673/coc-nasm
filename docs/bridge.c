#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
char* returnformat(char* a, ...) {
  return a;
}

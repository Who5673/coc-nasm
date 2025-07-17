section .text
  global unsigned_div

unsigned_div:
  mov rax, rdi
  div rax, rsi
  ret

section .text
  global signed_div

signed_div:
  mov rax, rdi
  idiv rax, rsi
  ret

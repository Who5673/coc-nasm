section .text
  global sum

sum:
  mov rax, rdi
  add rax, rsi
  ret

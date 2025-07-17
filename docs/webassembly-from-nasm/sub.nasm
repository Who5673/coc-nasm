section .text
  global sub

sub:
  mov rax, rdi
  sub rax, rsi
  ret

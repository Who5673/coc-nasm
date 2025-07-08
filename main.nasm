section .text
  global sum
sum:
  mov rax, rdi   ; rax = Return value, rdi = a = argv[1]
  add rax, rsi   ; rsi = b = argv[2]
  ret            ; Returns rax = a + b = rdi + rsi

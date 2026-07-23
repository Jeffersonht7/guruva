Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\User client\Documents\Criador de sites"
Do
  shell.Run """C:\Users\User client\Documents\Criador de sites\start-dev.cmd""", 0, True
  WScript.Sleep 1000
Loop

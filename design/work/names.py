suffixes = ['ium', 'ite', 'or']
chars = "abcdefghjiklmnopqrstuvwxyz"

for c1 in chars:
   for c2 in chars:
      for c3 in chars:
         for s in suffixes:
            print c1 + c2 + c3 + s

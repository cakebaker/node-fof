exports.caseInsensitiveCompare = (a, b) ->
  x = a.toLowerCase()
  y = b.toLowerCase()

  if (x < y) then -1 else
    if (x > y) then 1 else 0

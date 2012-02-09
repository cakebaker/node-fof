nicePeople = (x) ->
  switch x
    when 0 then 'No people'
    when 1 then 'One person'
    else "#{x} people"

exports.nicePeople = nicePeople

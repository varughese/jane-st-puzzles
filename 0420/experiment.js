// Represent as graph
0: 1, 2
1: 2, 3, 4
2: 4, 5
3: 4, 6, 7
4: 5, 7, 8
5: 8, 9
6: 7, 10, 11
...

so its a dag, algorithim might be go from 0 to end and try every combination of triad

so, 0: pick 1, 2
remove them
next is 3
3, pick 4 and 7, remove them, continue, if that doesnt work, recurse back to 3, and then pick 6 and 7 instead, recruse

this might be like O(2^n) though, because at every choice, if you mess up, takes a while. unsure if DP would help, need to spend a few more hours on it

# Solution
I first noticed a relation between the number of dots and the triangular numbers. `T(N) = N*(N+1)/ 2`. After some time, with brute forcing it by hand I noticed 9, 11, 12, 14 worked. I then tried to write an algorithm to recursively find the triads.

I represent this as a directed graph:
```
                        0  
                     1     2  
                  3     4     5  
               6     7     8     9  
```

Where, each number points to then number below it and to the left and below it and to the right. A node also points to the next number in the row, if there is one

So, if `N = 4`, `T(N) = 10`. 

```js
0 -> {1, 2}
1 -> {2, 3, 4}
2 -> {4, 5}
3 -> {4, 6, 7}
4 -> {5, 7, 8}
5 -> {8, 9}
6 -> {7}
7 -> {8}
8 -> {9}
9 -> {}
```

Then, the recursive algorithm decides goes through each dot. It picks the dot to its right in its row, and to its bottom right, and tries to make a triad. It then sets these dots to be 'used', and then recursively tries all other combinations. If it fails, it fails. 

Experimentally, I was able to solve for N<20, but then for probably the first time in my life, the runtime of a actual program I wrote became a limiting factor.

```
2       true    0.538713ms
3       false   0.056309ms
4       false   0.026469ms
5       false   0.008643ms
6       false   0.016236ms
7       false   0.022612ms
8       false   0.081329ms
9       true    0.062718ms
10      false   0.947802ms
11      true    0.081989ms
12      true    0.095513ms
13      false   7.163486ms
14      true    0.110075ms
15      false   15.207301ms
16      false   41.535941ms
17      false   58.837804ms
18      false   240.664708ms
19      false   1178.704311ms
20      false   6909.30447ms
21      true    0.111804ms
```

I at least was able to make some cool art so far:
![https://i.imgur.com/2rQupUD.png](https://i.imgur.com/2rQupUD.png)

![https://i.imgur.com/Bc5ZRJE.png](https://i.imgur.com/Bc5ZRJE.png)
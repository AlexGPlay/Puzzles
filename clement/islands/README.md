[Medium Google Coding Interview With Ben Awad](https://www.youtube.com/watch?v=4tYoVx0QoN0)

"Imagine that you have a black and white image, so the black and white image consists of pixels, or rather, is represented by pixels and this pixels are either black or white. The representation of this image is gonna be in the form of a matrix which is a two dimensional array and that two dimensial array only has the numbers 0 and 1. One represents a black pixel and zero represents a white pixel. You are gonna be tasked with removing all the black pixels that are not connected to the border of the image. So when I say connected I mean two or more pixels that are either horizontally or vertically adjacent and if they are not connected to the border you have to remove them. We are gonna call this blocks of black pixels that are not connected to the border, islands." - Clément

Sample Input:

[
[1, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 1, 1],
[0, 0, 1, 0, 1, 0],
[1, 1, 0, 0, 1, 0],
[1, 0, 1, 1, 0, 0],
[1, 0, 0, 0, 0, 1]
]

Sample output:

[
[1, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 1, 1],
[0, 0, 0, 0, 1, 0],
[1, 1, 0, 0, 1, 0],
[1, 0, 0, 0, 0, 0],
[1, 0, 0, 0, 0, 1]
]

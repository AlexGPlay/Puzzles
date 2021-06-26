[Google Coding Interview With A Facebook Software Engineer](https://www.youtube.com/watch?v=PIeiiceWe_w)

"If you were to take out your phone, either an iPhone or an Android phone and you were to look at your keypad, you will likely see something like this:

```
 ----- ----- -----
|     |     |     |
|  1  |  2  |  3  |
|     | abc | def |
 ----- ----- -----
|     |     |     |
|  4  |  5  |  6  |
| ghi | jkl | mno |
 ----- ----- -----
|     |     |     |
|  7  |  8  |  9  |
| pqrs| tuv | wxyz|
 ----- ----- -----
      |     |
      |  0  |
      |     |
       -----
```

Were you have got the numbers, the digits, 1, 2, 3, all the way to nine, but you would see on the digits, letters, under
the 2 you would see abc, under the 3 def and this is something that was really common in old phones and the reason it was
common it allowed you to have phone numbers that read like english.

I don't know if you have ever heard of the company 1 (800) flowers, is the name of a company and is also a phone number,
this phone number is actually 1 (800) 356 9377 but it kind of maps to 1 (800) flowers.

If you have got a keypad with digits, numbers, phone numbers, can represent words.
This phone number, 2536368 can represent either clement or clemdot or any other combination of words.

I want you to write an algorithm or a function that is gonna take two inputs, it is gonna take a phone number which is
a string of numbers aswell as a list of words, so I'll give you a sample input right now:

phoneNumber = "3662277"
words = ["foo", "bar", "baz", "foobar", "emo", "cap", "car", "cat"]

And I want your algorithm to determin which of the words in the list are contained in the phoneNumber.
For this particular input you would return like this:

["bar", "cap", "car", "emo", "foo", "foobar"]

This words happen to be in the phoneNumber.
" - Clément

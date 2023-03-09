export interface AimType {
  title: string;
  desc: string;
  testCases?: {
    case: string;
    output: string;
  }[];
}
const aim: AimType[] = [
  {
    desc: `
    <h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="Operators_are_the_constructs_which_can_manipulate_the_value_of_operands_0"></a>Operators are the constructs which can manipulate the value of operands.</h2>
<p class="has-line-data" data-line-start="1" data-line-end="4">Consider the expression  <code>4 + 5 = 9</code><br>
Here, <code>4</code>  and <code>5</code> are called operands and  <code>+</code>  is called operator.<br>
Python Variables:</p>
<ul>
<li class="has-line-data" data-line-start="4" data-line-end="5">Declare,</li>
<li class="has-line-data" data-line-start="5" data-line-end="6">Concatenate,</li>
<li class="has-line-data" data-line-start="6" data-line-end="7">Global &amp;</li>
<li class="has-line-data" data-line-start="7" data-line-end="8">Local</li>
</ul>
<h4 class="code-line" data-line-start=8 data-line-end=9 ><a id="What_is_a_Variable_in_Python_8"></a>What is a Variable in Python?</h4>
<p class="has-line-data" data-line-start="10" data-line-end="17">A Python variable is a reserved memory location to store values. In other words, a variable in a<br>
python program gives data to the computer for processing.<br>
Every value in Python has a datatype. Different data types in Python are Numbers, List, Tuple,<br>
Strings, Dictionary, etc. Variables can be declared by any name or even alphabets like a, aa, abc, etc.<br>
How to Declare and use a Variable<br>
Let see an example. We will declare variable “a” and print it.<br>
a=10</p>
    `,
    testCases: [
      {
        case: "",
        output: "",
      },
    ],
    title: "To find square root of number",
  },
  {
    title  :'To find the maximum of list of numbers',
    desc : `
    <h4 class="code-line" data-line-start=0 data-line-end=1 ><a id="Find_Maximum_Value_in_List_in_Python_0"></a>Find Maximum Value in List in Python</h4>
<p class="has-line-data" data-line-start="2" data-line-end="3">In this article, we will learn to find the maximum value in a list in Python. We will use some built-in functions, simple approaches, and some custom codes as well to understand the logic. Let’s first have a quick look over what is a list in Python and how can we find the maximum value or largest number in a list.</p>
<h3 class="code-line" data-line-start=4 data-line-end=5 ><a id="Python_List_4"></a>Python List</h3>
<p class="has-line-data" data-line-start="5" data-line-end="6">Python has a built-in data type called list. It is like a collection of arrays with different methodology. Data inside the list can be of any type say, integer, string or a float value, or even a list type. The list uses comma-separated values within square brackets to store data. Lists can be defined using any variable name and then assigning different values to the list in a square bracket. The list is ordered, changeable, and allows duplicate values. For example,</p>
<blockquote>
<p class="has-line-data" data-line-start="7" data-line-end="11">list1 = [“Ram”, “Arun”, “Kiran”]<br>
list2 = [16, 78, 32, 67]<br>
list3 = [“apple”, “mango”, 16, “cherry”, 3.4]<br>
Let us look at the below Python examples one by one to find the largest item in a list of comparable elements using the following methods-</p>
</blockquote>
<ul>
<li class="has-line-data" data-line-start="12" data-line-end="13">Using built-in max() function</li>
<li class="has-line-data" data-line-start="13" data-line-end="14">Brute Force Approach</li>
<li class="has-line-data" data-line-start="14" data-line-end="15">Using reduce() function</li>
<li class="has-line-data" data-line-start="15" data-line-end="16">By implementing the Heap Queue algorithm</li>
<li class="has-line-data" data-line-start="16" data-line-end="17">Using sort() function</li>
<li class="has-line-data" data-line-start="17" data-line-end="18">Using sorted() function</li>
<li class="has-line-data" data-line-start="18" data-line-end="19">By Tail Recursive algorithm</li>
</ul>
    `
  }
];


export default aim
### Problem Statement: Implementing a Custom Regular Expression Engine in Node.js

**Objective:**  
Develop a simplified custom regular expression engine in Node.js that can match strings based on specific pattern rules. The engine should handle core regex functionalities such as basic pattern matching, character classes, quantifiers, and alternations. The challenge lies in building the engine from scratch without using the built-in regex capabilities of JavaScript.

### Requirements:

1. **Core Features:**
   - **Pattern Parsing:**  
     Implement a parser that can interpret simple regular expression patterns. The patterns should include:
     - Literal characters (e.g., `abc` should match "abc").
     - Wildcards (e.g., `.` should match any single character).
     - Character classes (e.g., `[a-z]` should match any lowercase letter).
     - Quantifiers (e.g., `*`, `+`, `?` should represent zero or more, one or more, and zero or one occurrences, respectively).
     - Alternation (e.g., `a|b` should match either "a" or "b").

   - **Matching Engine:**  
     Build the matching engine that can:
     - Traverse the input string and match it against the parsed pattern.
     - Support both greedy and non-greedy matching for quantifiers.
     - Handle escaped characters (e.g., `\.` should match a literal dot rather than any character).

2. **Advanced Features:**
   - **Group Capturing:**  
     Implement group capturing and backreferences. For example, the pattern `(a|b)\1` should match "aa" or "bb".
   
   - **Lookahead and Lookbehind:**  
     Add support for positive and negative lookaheads (e.g., `a(?=b)` should match "a" only if followed by "b") and lookbehinds (e.g., `(?<=a)b` should match "b" only if preceded by "a").

   - **Anchors:**  
     Support start `^` and end `$` anchors to specify that the match must occur at the beginning or end of the string.

3. **Optimization Challenges:**
   - **Recursive Descent Parsing:**  
     Implement the engine using a recursive descent parser, ensuring that the parser can handle nested patterns efficiently.
   
   - **Backtracking Efficiency:**  
     Optimize the engine to handle backtracking efficiently, especially with complex patterns that involve multiple quantifiers and alternations.
   
   - **Time Complexity Constraints:**  
     Ensure the engine avoids catastrophic backtracking for certain complex patterns (e.g., nested quantifiers like `(a+)+`).

4. **Test Cases and Performance:**
   - **Edge Cases:**  
     Implement extensive test cases to cover edge cases such as:
     - Empty strings and patterns.
     - Very long input strings.
     - Nested and complex patterns.
     - Patterns with no possible match.
   
   - **Performance Benchmarking:**  
     Measure and optimize the engine's performance, especially when handling large inputs and patterns that involve extensive backtracking.

5. **Optional Enhancements (for Extra Complexity):**
   - **Regex Compilation:**  
     Implement a compilation step that transforms the regex pattern into a state machine (e.g., NFA/DFA) for faster execution.
   
   - **Extended Syntax Support:**  
     Add support for more advanced regex features such as non-capturing groups (e.g., `(?:...)`), Unicode character classes, and custom character sets.

---

### Constraints:

- **Time Limit:** 2 hours
- **Tools/Technologies:** Node.js (no built-in `RegExp` usage allowed), ES6+ features, recursion.
- **Focus:** Implement a functional regular expression engine that can handle complex patterns while ensuring performance, robustness, and correctness.

Feel free to use the internet for building and understanding regex!
# CLAUDE.md - AI Code Generation Guidelines

## CRITICAL INSTRUCTIONS FOR AI

Always follow the instructions in plan.md. When user says "go", find the next unmarked test in plan.md, implement the test, then implement only enough code to make that test pass.

**ANTI-HALLUCINATION RULES:**
- Never assume functionality not explicitly requested
- Always verify imports and dependencies exist before using them
- Do not create placeholder or mock implementations unless explicitly requested
- When uncertain, ask for clarification instead of guessing
- Avoid decorative elements (emojis, excessive formatting) in code

## LANGUAGE AND LOCALIZATION RULES

**MANDATORY KOREAN USAGE:**
- ALL code comments MUST be in Korean
- ALL commit messages MUST be in Korean
- ALL documentation comments (docstrings, JSDoc, etc.) MUST be in Korean
- ALL console.log/print statements for debugging MUST be in Korean
- ALL error messages displayed to users MUST be in Korean
- Variable names and function names remain in English
- Technical terms in comments can remain in English when no suitable Korean translation exists

Example:
```javascript
// ❌ WRONG
// This function calculates the total price
function calculateTotal(items) {
  // Add all prices
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ CORRECT
// 총 가격을 계산하는 함수
function calculateTotal(items) {
  // 모든 아이템의 가격을 합산
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

## ROLE AND EXPERTISE

You are a senior software engineer who follows Kent Beck's Test-Driven Development (TDD) and Tidy First principles. Your purpose is to guide development following these methodologies precisely while maintaining database-centric design patterns.

## DATABASE-CENTRIC DEVELOPMENT REQUIREMENTS

**MANDATORY DATABASE-FIRST APPROACH:**

1. **Schema Definition First**
   - ALWAYS define database schema before creating any business logic
   - Create migrations/DDL statements before implementing models
   - Document all constraints, indexes, and relationships in schema

2. **Data Integrity at Database Level**
   - Enforce constraints in database (NOT NULL, UNIQUE, CHECK, FOREIGN KEY)
   - Use database triggers for cross-table validations when necessary
   - Never rely solely on application-level validation

3. **Query Optimization Priority**
   - Design schemas with query patterns in mind
   - Create appropriate indexes based on access patterns
   - Use EXPLAIN ANALYZE before finalizing any complex query

4. **Transaction Management**
   - Explicitly define transaction boundaries
   - Use appropriate isolation levels
   - Implement retry logic for deadlock scenarios

Example Database-First Workflow:
```sql
-- 1. 먼저 스키마 정의
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- 데이터베이스 레벨 제약조건
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. 인덱스 정의
CREATE INDEX idx_users_email ON users(email);

-- 3. 그 다음 애플리케이션 코드 작성
```

## COMPONENT DEVELOPMENT RULES

**STRICT COMPONENT BOUNDARIES:**

1. **Single Responsibility**
   - Each component/module handles ONE specific domain
   - Clear input/output contracts defined
   - No cross-domain logic mixing

2. **Dependency Injection**
   - All dependencies passed explicitly
   - No hard-coded external service calls
   - Use interfaces/protocols for abstraction

3. **Component Structure**
   ```
   component/
   ├── interface.ts      # 인터페이스 정의
   ├── implementation.ts # 구현
   ├── tests/           # 테스트
   └── index.ts         # 공개 API
   ```

4. **Component Communication**
   - Use event-driven patterns for loose coupling
   - Define clear message contracts
   - Implement circuit breakers for external calls

## ENHANCED TDD METHODOLOGY

**MANDATORY TEST PATTERNS:**

1. **Test Naming Convention**
   ```typescript
   // 테스트명은 한국어로 작성
   describe('UserService', () => {
     it('유효한 이메일로 사용자를 생성해야 한다', () => {});
     it('중복된 이메일로 사용자 생성 시 에러를 발생시켜야 한다', () => {});
   });
   ```

2. **Test Structure (AAA Pattern)**
   ```typescript
   it('특정 조건에서 예상 결과를 반환해야 한다', () => {
     // Arrange: 테스트 데이터 준비
     const testData = {...};
     
     // Act: 실행
     const result = functionUnderTest(testData);
     
     // Assert: 검증
     expect(result).toEqual(expectedValue);
   });
   ```

3. **Database Testing Rules**
   - Use transactions for test isolation
   - Rollback after each test
   - Use test-specific database or schema

## TIDY FIRST APPROACH WITH CLEAR SEPARATION

**COMMIT MESSAGE FORMAT:**
```
[구조변경] 메서드 추출 - UserValidator 분리
[기능추가] 사용자 인증 기능 구현
[버그수정] 이메일 검증 로직 오류 수정
[리팩토링] 중복 코드 제거
[DB변경] users 테이블에 last_login 컬럼 추가
```

## CODE QUALITY STANDARDS

**EXPLICIT REQUIREMENTS:**

1. **Error Handling**
   ```typescript
   // ❌ WRONG
   try {
     doSomething();
   } catch(e) {
     console.log(e);
   }
   
   // ✅ CORRECT
   try {
     doSomething();
   } catch(e) {
     // 구체적인 에러 타입별 처리
     if (e instanceof ValidationError) {
       logger.error('검증 실패:', e.details);
       throw new UserFriendlyError('입력값을 확인해주세요');
     }
     // 예상치 못한 에러는 상위로 전파
     throw e;
   }
   ```

2. **No Magic Numbers or Strings**
   ```typescript
   // ❌ WRONG
   if (user.age > 19) {}
   
   // ✅ CORRECT
   const ADULT_AGE_IN_KOREA = 19;
   if (user.age > ADULT_AGE_IN_KOREA) {}
   ```

## MEMORY AND PERFORMANCE REQUIREMENTS

**FROM PROVIDED DOCUMENT:**

1. **No panic!() in production paths** - Always return Result<T, Error>
2. **Prevent memory leaks** - Every allocation must have deallocation
3. **Ensure data integrity** - All state transitions preserve consistency
4. **Consistent error handling** - Single pattern throughout codebase
5. **Comprehensive testing** - Write tests BEFORE implementation
6. **Bounds checking** - Validate all numeric conversions
7. **Document bugs immediately** - Fix before continuing

## SECURITY REQUIREMENTS

1. **Input Validation**
   - Validate at database level first
   - Secondary validation in application
   - Sanitize all user inputs

2. **SQL Injection Prevention**
   - Always use parameterized queries
   - Never concatenate SQL strings

3. **Authentication/Authorization**
   - Implement at database level when possible
   - Use Row Level Security (RLS) where available

## DEVELOPMENT WORKFLOW

### Step-by-Step Process:

1. **Database Design Phase**
   - Define schema with all constraints
   - Create migration scripts
   - Set up indexes based on queries

2. **Test Creation Phase**
   - Write failing integration test
   - Write failing unit test
   - Tests must have Korean descriptions

3. **Implementation Phase**
   - Write minimum code to pass tests
   - All comments in Korean
   - Follow single responsibility

4. **Refactoring Phase**
   - Only when all tests pass
   - Separate structural/behavioral changes
   - Commit with Korean messages

5. **Documentation Phase**
   - Update API documentation (Korean)
   - Update database schema documentation
   - Add usage examples

## ANTI-PATTERNS TO AVOID

**NEVER DO:**
- Mix languages in comments (stick to Korean)
- Skip database constraints in favor of app validation
- Write code without tests
- Use any!, unknown, or void without explicit reason
- Ignore compiler/linter warnings
- Create "god objects" or "utility dumps"
- Use synchronous I/O in async contexts

## FINAL CHECKLIST

Before marking any code complete:
- [ ] All tests pass (단위 + 통합 테스트)
- [ ] Database schema reviewed and optimized
- [ ] No compiler/linter warnings
- [ ] All comments in Korean
- [ ] Commit messages in Korean
- [ ] Error handling comprehensive
- [ ] Performance benchmarks acceptable
- [ ] Security review completed
- [ ] Documentation updated

## PROMPT ENGINEERING FOR CLARITY

When requesting code generation:
1. Be explicit about database schema first
2. Specify exact test cases needed
3. Define clear component boundaries
4. Request Korean comments explicitly
5. Specify error handling requirements
6. Define performance constraints upfront

The commit should not necessarily include cloud contributions, but ask the worker with a commit message and commit with a user account.

**Remember: This document is the single source of truth. Follow it precisely without deviation.**
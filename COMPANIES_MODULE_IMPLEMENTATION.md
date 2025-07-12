# Модуль Companies - Реалізація

## Огляд

Модуль Companies був розширений для підтримки створення компаній та управління зв'язками між рекрутерами та компаніями при реєстрації.

## Реалізована функціональність

### 1. Створення компанії при реєстрації рекрутера

**Логіка:**
- При реєстрації рекрутера створюється `userDetails` з роллю "recruiter" ✅
- Створюється `recruiterProfile` ✅
- Створюється `company` (власна компанія) ✅
- Створюється `userCompany` з роллю "Owner" ✅

**Архітектура:**
- Використовується Event-Driven архітектура
- `UserCreatedEvent` → `CreateUserProfileUseCase` → `RecruiterProfileCreatedEvent` → `RecruiterProfileCreatedEventHandler` → створення компанії

### 2. Створені сутності

#### Company Entity
```typescript
export class Company {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly website?: string;
  public readonly logo?: string;
  public readonly industry?: string;
  public readonly size?: string;
  public readonly location?: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
```

#### UserCompany Entity
```typescript
export class UserCompany {
  public readonly id: string;
  public readonly recruiterProfileId: string;
  public readonly companyId: string;
  public readonly companyRoleId: string;
  public readonly isActive: boolean;
  public readonly joinedAt: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
```

### 3. Репозиторії

- `ICompanyRepository` - базові операції з компаніями
- `IUserCompanyRepository` - управління зв'язками рекрутер-компанія
- `DrizzleCompanyRepository` - реалізація з Drizzle ORM
- `DrizzleUserCompanyRepository` - реалізація з Drizzle ORM

### 4. Use Cases

- `CreateCompanyUseCase` - створення компанії
- `CreateUserCompanyUseCase` - створення зв'язку рекрутер-компанія

### 5. Event Handlers

- `RecruiterProfileCreatedEventHandler` - автоматичне створення компанії при створенні профілю рекрутера

### 6. Маппери

- `CompanyMapper` - маппінг між доменною моделлю та схемою БД
- `UserCompanyMapper` - маппінг між доменною моделлю та схемою БД

## Перевірки

✅ Тільки рекрутери можуть бути в компаніях (логіка реалізована через event handler, який спрацьовує тільки для рекрутерів)

## Схема БД

Використовується існуюча схема з таблицями:
- `company` - компанії
- `user_company` - зв'язки рекрутер-компанія
- `company_role` - ролі в компанії
- `company_permission` - дозволи
- `company_role_permission` - зв'язки ролі-дозволи

## Використання

При реєстрації рекрутера автоматично:
1. Створюється профіль рекрутера
2. Публікується `RecruiterProfileCreatedEvent`
3. Event handler створює компанію з назвою "Company of {userId}"
4. Створюється зв'язок з роллю "Owner"

## Майбутні покращення

1. Додати можливість оновлення назви компанії
2. Реалізувати інвайтації в компанію
3. Додати валідацію унікальності компаній
4. Реалізувати управління ролями та дозволами 
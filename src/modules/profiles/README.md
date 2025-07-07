# Модуль профилей (Profiles Module)

Модуль профилей отвечает за управление профилями пользователей в системе Jobio. Поддерживает два типа профилей: кандидаты и рекрутеры.

## Архитектура

Модуль следует Clean Architecture с разделением на слои:

```
src/modules/profiles/
├── application/           # Слой приложения
│   ├── dto/              # Data Transfer Objects
│   └── use-cases/        # Use Cases (команды и запросы)
├── domain/               # Доменный слой
│   ├── entities/         # Доменные сущности
│   ├── mappers/          # Мапперы для преобразования данных
│   └── repositories/     # Интерфейсы репозиториев
├── infrastructure/       # Инфраструктурный слой
│   ├── controllers/      # HTTP контроллеры
│   ├── event-handlers/   # Обработчики событий
│   └── persistence/      # Реализации репозиториев
└── profiles.module.ts    # Основной модуль
```

## Структура базы данных

### Таблицы:
1. **user_details** - основная информация о пользователе
2. **candidate_profile** - профиль кандидата
3. **recruiter_profile** - профиль рекрутера

### Связи:
- `user_details.user_id` → `auth.users.id` (1:1)
- `candidate_profile.user_details_id` → `user_details.id` (1:1)
- `recruiter_profile.user_details_id` → `user_details.id` (1:1)

## API Endpoints

### Создание профиля
```http
POST /profiles
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "fullName": "Иван Иванов",
  "role": "candidate" // или "recruiter"
}
```

### Получение своего профиля
```http
GET /profiles/me
Authorization: Bearer <jwt_token>
```

### Обновление профиля кандидата
```http
PUT /profiles/candidate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "position": "Frontend Developer",
  "skills": ["React", "TypeScript", "Node.js"],
  "experience": 3,
  "salaryExpectations": 5000,
  "englishLevel": "B2",
  "country": "Украина",
  "city": "Киев"
}
```

### Обновление профиля рекрутера
```http
PUT /profiles/recruiter
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "company": "TechCorp",
  "telegram": "@recruiter",
  "phone": "+380501234567",
  "linkedin": "linkedin.com/in/recruiter"
}
```

## Автоматическое создание профилей

При регистрации пользователя автоматически создается:
1. Запись в `user_details` с ролью "candidate" (по умолчанию)
2. Соответствующий профиль в `candidate_profile`

Это происходит через обработчик события `UserCreatedEvent`.

## Использование в коде

### Создание профиля программно:
```typescript
@Inject(ProfilesDiToken.CREATE_USER_PROFILE_USE_CASE)
private readonly createUserProfileUseCase: ICreateUserProfileUseCase;

// Создание профиля
await this.createUserProfileUseCase.execute({
  userId: 'user-id',
  role: 'candidate',
  fullName: 'Иван Иванов'
});
```

### Получение профиля:
```typescript
@Inject(ProfilesDiToken.GET_USER_PROFILE_USE_CASE)
private readonly getUserProfileUseCase: IGetUserProfileUseCase;

// Получение профиля
const profile = await this.getUserProfileUseCase.execute({
  userId: 'user-id'
});
```

## Расширение функциональности

### Добавление новой роли:
1. Создать новую таблицу профиля в схеме
2. Создать доменную сущность
3. Создать маппер
4. Создать репозиторий
5. Добавить в модуль
6. Обновить логику создания профилей

### Добавление новых полей:
1. Обновить схему базы данных
2. Обновить доменную сущность
3. Обновить маппер
4. Обновить DTO
5. Обновить use cases

## Миграции

При изменении схемы базы данных необходимо создать миграцию:

```bash
npm run db:generate
npm run db:migrate
``` 
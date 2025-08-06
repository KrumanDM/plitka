import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { Express } from 'express';

export const applySecurityMiddleware = (app: Express) => {
  // 🛡️ HTTP заголовки
  app.use(helmet()); //даёт CSP и защищает от XSS через заголовки

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:5001", "http://localhost:3000"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );

  // Защита от NoSQL-инъекций
  app.use(mongoSanitize()); //чистит вредоносные Mongo-операторы

  // Защита от HTTP Parameter Pollution
  app.use(hpp());//убирает вредные повторяющиеся параметры

  // 🚦 Ограничение количества запросов
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    limit: 100, // максимум 100 запросов с одного IP
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  });
  app.use(limiter);
};

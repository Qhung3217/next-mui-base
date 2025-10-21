FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 
COPY . .
RUN yarn build




FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json /app/yarn.lock /app/.env ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 8083

CMD ["yarn", "start"]



# Use a large Node.js base image to build the application and name it "build"
FROM node:18-alpine as build

# Exact same steps as before
WORKDIR /app


# Salin file package.json dan yarn.lock untuk instalasi dependensi
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Salin semua file sumber ke dalam kontainer
COPY . .

# Mendefinisikan build arguments
ARG VUE_APP_DEFAULT_AUTH
ARG PASSPHRASE
ARG RECAPTCHA_SITEKEY
ARG RECAPTCHA_SECRETKEY
ARG SATUDATA_USERNAME
ARG SATUDATA_PASSWORD
ARG API_BASE_URL
ARG BASE_URL_PORT
ARG API_MOCKUP_URL

# Mendefinisikan build arguments
ENV VUE_APP_DEFAULT_AUTH=${VUE_APP_DEFAULT_AUTH}
ENV PASSPHRASE=${PASSPHRASE}
ENV RECAPTCHA_SITEKEY=${RECAPTCHA_SITEKEY}
ENV RECAPTCHA_SECRETKEY=${RECAPTCHA_SECRETKEY}
ENV SATUDATA_USERNAME=${SATUDATA_USERNAME}
ENV SATUDATA_PASSWORD=${SATUDATA_PASSWORD}
ENV API_BASE_URL=${API_BASE_URL}
ENV BASE_URL_PORT=${BASE_URL_PORT}
ENV API_MOCKUP_URL=${API_MOCKUP_URL}

RUN yarn build


# Stage 2: Create a production-ready image
FROM node:18-alpine as prod

# Set working directory
WORKDIR /app


# Copy the built application from the build stage
COPY --from=build /app/.nuxt /app/.nuxt
COPY --from=build /app/static /app/static
COPY --from=build /app/locales /app/locales
COPY --from=build /app/proxy.json /app/proxy.json
COPY --from=build /app/package.json /app/yarn.lock /app/nuxt.config.js /app/

# Install only production dependencies
RUN yarn install --production

# Expose port (default Nuxt.js port is 3000)
EXPOSE 3000

# Start the Nuxt.js application
CMD ["yarn", "start", "--hostname", "0.0.0.0"]

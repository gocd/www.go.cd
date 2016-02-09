FROM ruby:2.3

RUN apt-get update -qq && apt-get install -y nodejs

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install

VOLUME /site
WORKDIR /site

CMD jekyll serve -H 0.0.0.0 --force_polling

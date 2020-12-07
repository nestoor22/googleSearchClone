FROM python:3.8.2

WORKDIR /app

COPY Pipfile /app/

RUN pip install -U pip pipenv
RUN pipenv install

COPY . /app

CMD ["pipenv", "shell"]
CMD ["pipenv", "run", "python", "main.py"]

# Forward-PG-Tunnel

<sub>English</sub>

## Deіcription

Package for creating an ssh tunnel and sending additional messages to the PostgreSQL database

## Getting started
```
npm i forward-pg-tunnel
```
To start, you need to fill in the default configuration file located in the config folder.

### Configuration file

| Section | Key | Type | Example | Description|
|---|---|---|---|---|
|sshConfig|host|string|"20.95.0.236"|SSH route host|
|sshConfig|port|503|number|SSH port to the route|
|sshConfig|username|string|"root"|SSH route login|
|sshConfig|password|string|""|SSH route password. If not used leave blank|
|sshConfig|privateKey|string|"~/.ssh/id_rsa_dell_r620"|The path to the connection key|
|tunnelOptions|autoClose|boolean|true|Auto close tunnel|
|serverOptions|host|string|"localhost"|Local address where the TCP server will be started|
|serverOptions|port|number|5432|Local port where the TCP server will be running|
|forwardOptions|srcPort|number|5432|Port on the remote host that will be sent to the local host|
|forwardOptions|dstAddr|string|"192.168.0.105"|Database address on the remote host|
|forwardOptions|dstPort|number|5432|Database port on a remote host|
|pgClient|user|string|"postgre"|Database user|
|pgClient|host|string|"localhost"|Database host|
|pgClient|database|string|"postgre"|Database name|
|pgClient|password|string|"password"|DB password|
|pgClient|port|number|5432|DB port|
|visible|show|boolean|true|Reflection of alkalis during Operation|

### Usage examples
<sub>Create an instance and call the methods</sub>

```
import PostgreTunnelConnector from 'forward-pg-tunnel';

const dbConnector = new PostgreTunnelConnector();
dbConnector.runQuery("SELECT * FROM regions limit 5");
```
---
<sub>Українська</sub>

## Опис
Пакет для створення ssh тунелю та пробросу досупів до бази данних PostgreSQL

## Початок роботи

```
npm i forward-pg-tunnel
```

Для пзапуску необхідно заповнити конфігураційний файл default котрий знаходиться в папці config.

### Конфігуційний файл

| Розділ | Ключ | Тип | Приклад | Опис|
|---|---|---|---|---|
|sshConfig|host|string|"5.59.105.0"|Хост ssh маршруту|
|sshConfig|port|503|number|Порт ssh маршруту|
|sshConfig|username|string|"root"|Логін ssh маршруту|
|sshConfig|password|string|""|Пароль ssh маршруту. Якщо не використовуєтья залишити порожнім|
|sshConfig|privateKey|string|"~/.ssh/id_rsa_dell_r620"|Шлях до ключа підключення|
|tunnelOptions|autoClose|boolean|true|Автозачинення тунелю|
|serverOptions|host|string|"localhost"|Локальна адреса, на якій буде запущений TCP сервер|
|serverOptions|port|number|5432|Локальний порт, на якому буде запущений TCP сервер|
|forwardOptions|srcPort|number|5432|Порт на віддаленому хості, який буде проброшен на локальний хост|
|forwardOptions|dstAddr|string|"192.168.0.105"|Адреса бази даних на віддаленому хості|
|forwardOptions|dstPort|number|5432|Порт бази даних на віддаленому хості|
|pgClient|user|string|"postgre"|Користувач БД|
|pgClient|host|string|"localhost"|Хост БД|
|pgClient|database|string|"postgre"|Назва БД|
|pgClient|password|string|"password"|Пароль БД|
|pgClient|port|number|5432|Порт БД|
|visible|show|boolean|true|Відображення логів у процессі роботи|

### Приклади використання
<sub>Створіть екземпляр і викликайте методи</sub>

```
import PostgreTunnelConnector from 'forward-pg-tunnel'

const dbConnector = new PostgreTunnelConnector();
dbConnector.runQuery("SELECT * FROM regions limit 5");
```

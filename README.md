# AE-1-Summer-Short-Internship2024 / team9
# Reo Nishimura test
# aiueo

# Implementation

Bulid db container by the command below

```
$ cd rakuten_team9
$ make dev
```

Initialize database in directory `rakuten_team9`

```
$ make mig
$ make init
```

Build next app by the command below and access `localhost3000`

```
$ cd rakuten_team9
$ make app
```

You can configure the db by the command below
```
$ make show
```

The commnad below makes container down
```
$ make down
```
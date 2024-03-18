# ...

### Table

##### `TableTd`
```html
<TableTd
    :renderConfig="getTablecolumns()[0]"
    :record="RECORD"
/>
```

```html
<TableTd
    v-html="getColumnData(
        getTablecolumns()[0],
        RECORD
    )"
/>
```

```html
<TableTd>Valor</TableTd>
```
```html
<TableTd
    attribute="id"
    :record="RECORD"
/>
```

```html
<TableTd
    :renderConfig="{
        key: 'id',
    }"
    :record="RECORD"
/>
```

# Замена кода

### **Последовательная разработка**

В процессе работы над любым проектом требуется производить различные, множественные замены кода в файлах.

### **С помощью регулярных выражений**

Найти в документе секцию `style` :

```css
<style[^>]*>([\s\S]*?)<\/style>
```

Хорошо работет в редакторе **TextMate**.

Такое выражение не сработает в `VSCode` при поиске в режиме регулярных выражений. Дополнительно потребуется включить флажок для поиска в нижнем регистре. 


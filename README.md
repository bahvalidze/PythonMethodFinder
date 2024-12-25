# PythonMethodFinder - VS Code Extension

**PythonMethodFinder** – это расширение для Visual Studio Code, предназначенное для поиска всех функций и методов в Python-коде и быстрого перехода к их реализации. Оно помогает разработчикам эффективно навигировать по коду, особенно в больших проектах.

## 📋 Features

- **Поиск всех функций и методов**: Автоматический анализ текущего Python-файла для поиска всех функций и методов.
- **Интерактивный список функций**: Отображение найденных функций и методов в виде списка с возможностью выбора и перехода к нужному элементу.
- **Переход к функции**: Быстрый переход к выбранной функции с прокруткой к её местоположению в коде.
- **Прокрутка и выделение**: После выбора функции из списка, редактор автоматически прокручивает до этой функции и выделяет её для удобства работы.
- **Простота использования**: Минимальная настройка и мгновенный доступ к функциям через командную палитру VS Code.

---

## ⚙️ Requirements

1. Установленный **Visual Studio Code** версии **1.60.0** или новее.
2. Плагин работает для Python-файлов, откройте `.py` файлы для использования.

---

## 🚀 Usage

### Поиск и переход к функциям

1. Откройте Python файл в Visual Studio Code.
2. Перейдите в командную палитру с помощью `Ctrl+Shift+P` (или `Cmd+Shift+P` на Mac).
3. Введите команду **Find Methods** и выберите её.
4. В появившемся списке выберите нужную функцию или метод.
5. Редактор автоматически прокрутит до строки с выбранной функцией и выделит её.

### Настройки

Вы можете настроить поведение плагина через настройки VS Code. Для этого откройте настройки через `Ctrl+,` и найдите **PythonMethodFinder**.

---

## 🔍 Known Issues

- Плагин не поддерживает поиск в файлах с нестандартными расширениями.
   Решение: Убедитесь, что файл имеет расширение `.py`.
- Для очень больших файлов поиск может быть немного медленным.
   Решение: Разделите большие файлы на более мелкие модули.


## 🗒️ Release Notes

### 1.0.0
- Добавлен поиск всех функций и методов в Python-файле.
- Реализована возможность перехода и прокрутки к выбранной функции.
- Встроенная поддержка подсветки найденных функций в коде.
- Интерактивный список доступных функций и методов.

---

## 📚 Following Extension Guidelines

Данное расширение разработано с соблюдением рекомендаций для расширений Visual Studio Code.

Подробнее:

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## 💡 For More Information

- [Visual Studio Code Documentation](https://code.visualstudio.com/docs)
- [Python Documentation](https://docs.python.org/3/)

**Enjoy Coding with PythonMethodFinder in Python! 🚀**

---

by **Бахвалов Андрей M3104**

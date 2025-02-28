### **Проєкт: Пошук новин з NewsAPI**

Реалізуй веб-додаток для пошуку новин за ключовими словами, використовуючи
**Vite** та **Axios** для HTTP-запитів.

📌 **Технічні вимоги:**

1. Використовуй **Vite** для створення проєкту.✅
2. Використовуй **Axios** для HTTP-запитів.
3. Організуй код у модулях (`export`/`import`):
   - **news-api.js** – функції для роботи з API.
   - **render-functions.js** – функції для відображення новин.
   - **main.js** – основна логіка додатка.
4. Використовуй **async/await** для асинхронних запитів.
5. Відформатуй код за допомогою **Prettier**.
6. Використовуй **iziToast** для повідомлень.

---

## **Функціонал**

✅ **1. Пошук новин**

- Користувач вводить ключове слово у форму.
- Надсилається запит до **NewsAPI**:
  ```
  https://newsapi.org/v2/everything?q={keyword}&apiKey=YOUR_API_KEY
  ```
- У відповіді API повертається список новин.
- Відображаються заголовки, зображення та посилання на повні статті.

✅ **2. Пагінація (Load more)**

- Початкове значення `page = 1`.
- З кожним кліком на `Load more` `page` збільшується на 1.
- Якщо `totalResults` досягнуто – ховаємо кнопку та виводимо `"No more news"`.

✅ **3. Обробка помилок**

- Якщо немає результатів – вивести `"No news found"`.
- Якщо сталася помилка (наприклад, 404), вивести `"Something went wrong"`.

✅ **4. Плавний скрол після кожного завантаження**

- Прокручувати сторінку вниз після завантаження нової групи новин.

✅ **5. Дизайн**

- Використовуй **CSS** для оформлення карток новин.
- Кнопка `Load more` має бути прихована, поки немає результатів.

---

⚡ **Додатково:**

- Зроби можливість сортування новин за датою (`sortBy=publishedAt`).
- Додай `loader` для очікування відповіді API.

Цей проєкт допоможе тобі попрактикуватися з **Axios, async/await, API-запитами,
пагінацією та модульністю в JavaScript**. 🚀

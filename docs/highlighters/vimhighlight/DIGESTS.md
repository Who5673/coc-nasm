## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
  integrity="sha384-5xdYoZ0Lt6Jw8GFfRP91J0jaOVUq7DGI1J5wIyNi0D+eHVdfUwHR4gW6kPsw489E"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"
  integrity="sha384-HdearVH8cyfzwBIQOjL/6dSEmZxQ5rJRezN7spps8E7iu+R6utS8c2ab0AgBNFfH"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-BUf3LQCyA1W0AggXd23Sd5S8mf9Bfy87Lfo0l8DYF92VoNcJXk8ShM8BjJ4X3AeM /es/languages/vim.js
sha384-RoYI/9AQK5AF2G++68SRqb7LiSal0kL5sm7eTfGI+cvx1PaJDbLr846Xz+Y1IZ4N /es/languages/vim.min.js
sha384-mq0tB6BMUaygd1/gw1OWkOWuTdZHYi1F3+JIKBvfmigeIWRCyE1K6SlPoeQkfrXe /languages/vim.js
sha384-VlQzka731dwu27YSdIJ3tZrqCAmRLQx0FdETJM+V77rW7mxiFH+uR26/E0njLbkd /languages/vim.min.js
sha384-ugHt4hnwlb2AfkAH45TiFLIULDoH85XpwIHz7UxNl8Kp8/GKz5uCVrkZK60Ryvrz /highlight.js
sha384-qnDQFzsQtq2Rh9kkrKuFJR6zhjR3Lt6bE6LZVRYGRrnxCnIUDRS0BUoyPMvgqK36 /highlight.min.js
```


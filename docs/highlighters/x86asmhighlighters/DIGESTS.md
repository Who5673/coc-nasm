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
sha384-SlI/W+G8uWNUJSAK5aQ6qG6L1vCJfzBIj4n7pmxtlQLBONfh4nqlvapD4XN3obTG /es/languages/x86asm.js
sha384-6jCvxwz6+4SETxn2V7LPLbyOa80MAobeFcGMoSk3ZR25GKcQQdZierMKqC5XdM+6 /es/languages/x86asm.min.js
sha384-84n3ZSWWJWOuj+nQr6fRxTWhQzXtn0OxWyGL/59PeLhK/0Ii3XgZD9oMInf7+bCW /languages/x86asm.js
sha384-d1w6as9peRTJh7Tgj50482oZIrj0+1guPVjy1QRfEafPvwMu6JZ/J9CiS5cT8XE9 /languages/x86asm.min.js
sha384-uv3vzrnqIo63g/sPVpijFAzVIotup5Jfrqd/NOlyH2AjiUhOxXQjLTS0dO8GGtYI /highlight.js
sha384-ZQqMSKXA6RA3GppZSucQqdvHA8YKXORv0xTEDOSf8x59UVbpwbdKgDlHwWHifF3e /highlight.min.js
```


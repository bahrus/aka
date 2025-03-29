# xp-as (📎)

```html
<table>
    <tr id=testRow aria-rowindex=11
        xp-as
        xp-as-a-from=aria-rowindex
    >
        <td>
            ...
        </td>
    </tr>
</table>
<script>
    const xpAs = testRow.beEnhanced.xpAs;
    console.log(xpAs.props.a - 3);
    // 8
    xpAs.props.addEventListener('a', e => {
        console.log(xpAs.props.a - 3);
        //2
    });
    testRow.ariaRowIndex = 5;
</script>
```

"xp" is short for "export".

## Shortcuts

A number of shortcuts are available:

In less formal environments, and/or in environments where this element enhancement is widely used, we can replace the relatively short xp-as with an even shorter name, wuch as  📎, which this package supports.  On Windows OS, you can access this emoji by typing 🪟 + "." and search for "clippy".  Also, the "-from" part of the attribute is optional.  So this also works if one references 📎.js instead of emc.js:


```html
<table>
    <tr id=testRow aria-rowindex=11
        📎📎-a=aria-rowindex
    >
        <td>
            ...
        </td>
    </tr>
</table>
<script>
    const xpAs = testRow.beEnhanced.📎;
    console.log(xpAs.props.a - 3);
    // 8
    xpAs.props.addEventListener('a', e => {
        console.log(xpAs.props.a - 3);
        //2
    });
    testRow.ariaRowIndex = 5;
</script>
```


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

or 

```html
<table>
    <tr id=testRow aria-rowindex=11
        📎
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


# Button

The button component is a simple customizable button.

| Prop       | Description                     | Accepted Values         | Default     |
|:-----------|:--------------------------------|:------------------------| :---------- |
| `tabs`     | Array of tabs                   | `string[]` or `object[]`| `undefined` |
| `lazyLoad` | Whether to lazyLoad tab content | `true` or `false`       | `undefined` |


```vue
<div style="margin-bottom: 16px">
    <ReTab :lazyLoad="false" :tabs="['Vue component', 'HTML div', 'HTML span']">
      <SomeVueComponent />
      <div class="p-2">
        hello - this is a HTML div
      </div>
      <span>
        hello - this is a HTML span<ReButton color="primary" variant="outline">AAAAAh</ReButton>
      </span>
    </ReTab>
</div>

<div style="margin-bottom: 16px">
    <ReTab variant="underline" :tabs="['Vue component', 'HTML div', 'HTML span']">
      <SomeVueComponent />
      <div class="p-2">
        hello - this is a HTML div
      </div>
      <span>
        hello - this is a HTML span
      </span>
    </ReTab>
</div>

<div style="margin-bottom: 16px">
    <ReTab 
        :tabs="[
          {
            name: 'Custom prop disabled tab',
            onClick: null,
            props: { disabled: true }
          },
          {
            name: 'Custom on click function',
            onClick: customTabClick,
          }
        ]">
      <SomeVueComponent />
      <div class="p-2">
        hello - this tab has been clicked {{ count }} times
      </div>
    </ReTab>
</div>
```

<ReTabExample />

<script setup>
import ReTabExample from './ReTabExample.vue'
</script>

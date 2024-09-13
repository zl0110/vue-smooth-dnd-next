<h1 align="center"> vue-smooth-dnd-next </h1>

<p align="center">
  Vue 3 Wrapper of smooth-dnd library.
  <br/>
  <a href="https://github.com/zl0110/vue-smooth-dnd-next" target="__blank"><b>Live demo</b></a>
</p>

Forked from <a href="https://github.com/gilnd/vue3-smooth-dnd">vue3-smooth-dnd</a>, **fixed the memory leak issue**.

> This Vue 3 wrapper for [smooth-dnd](https://github.com/kutlugsahin/smooth-dnd) is forked from the original author's [Vue 2 wrapper](https://github.com/kutlugsahin/vue-smooth-dnd) and fixes the memory leak issue.

All the [documentation](https://github.com/kutlugsahin/vue-smooth-dnd/blob/master/README.md) for the Vue 2 version works with this [package](https://www.npmjs.com/package/vue-smooth-dnd-next) version too!
    
## Install

```bash
yarn add vue-smooth-dnd-next
```

## Usage
    
```jsx
<template>
  <div>
    <span>Studio Ghibli Tier List</span>
    <Container orientation="vertical" @drop="onDrop">            
      <Draggable v-for="(item, i) in items" :key="item.id">
        <div>
           {{i + 1}} -> {{item.data}}
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd-next";
export default {
  name: "app",
  components: { Container, Draggable },
  data() {
    return {
      items: [
        { id: 1, data: "Princess Mononoke" },
        { id: 2, data: "Spirited Away" },
        { id: 3, data: "My Neighbor Totoro" },
        { id: 4, data: "Howl's Moving Castle" }
      ]
    };
  },
  methods: {  
    onDrop(dropResult){
      this.items = this.applyDrag(this.items, dropResult);
    },
    applyDrag(arr, dragResult){
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;
      
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    }
  }
}
</script>
```

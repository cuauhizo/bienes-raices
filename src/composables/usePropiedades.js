import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function usePropiedades() {
  const alberca = ref(false)
     const storage = useFirebaseStorage()
  const db = useFirestore()
  const propiedadesCollection = useCollection(collection(db, 'propiedades'))

  async function deleteItem(id, urlImage) {
    // console.log(id);
    if (confirm('¿Deseas eliminar esta propiedad?')) {
    const docRef = doc(db, 'propiedades', id)
    const imageRef = storageRef(storage, urlImage)
    
    // await deleteDoc(docRef)
    // await deleteObject(imageRef)
    await Promise.all([
      deleteDoc(docRef),
      deleteObject(imageRef)
    ])
    }
  }

  const filteredItems = computed(() => {
    return alberca.value ?
            propiedadesCollection.value.filter( propiedad => propiedad.alberca ) :
            propiedadesCollection.value
  })

  return {
    alberca,
    deleteItem,
    propiedadesCollection,
    filteredItems
  }
}
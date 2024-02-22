import { ref } from "vue"

export default function useLocationMap() {

  const zoom = ref(17)
  const center = ref([25.767424, -80.192053])
  function pin(e) {
    // console.log(e.target);
    // console.log(e.target.getLatLng());

    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
    // console.log(center.value);
  }

  return {
    zoom,
    center,
    pin
  }
}
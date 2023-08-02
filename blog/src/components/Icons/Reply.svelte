<script>
  export let size = "50px";
  export let strokeWidth = "1.1";
  export let color = "#000000";
  export let fill = "none";
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  {fill}
  xmlns="http://www.w3.org/2000/svg"
  ><path
    d="M2 10h14c8 0 8 11 0 11M2 10l7-7m-7 7l7 7"
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg
>

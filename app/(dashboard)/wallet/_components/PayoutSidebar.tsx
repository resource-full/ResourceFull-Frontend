"use client";

import styles from "./PayoutSidebar.module.css";

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const GTCO = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="40" height="40" rx="4" fill="white" />
    <rect width="40" height="40" rx="4" fill="url(#pattern0_3058_67028)" />
    <rect width="40" height="40" rx="4" fill="url(#pattern1_3058_67028)" />
    <rect width="40" height="40" rx="4" fill="url(#pattern2_3058_67028)" />
    <defs>
      <pattern id="pattern0_3058_67028" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3058_67028" transform="scale(0.0078125)" />
      </pattern>
      <pattern id="pattern1_3058_67028" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3058_67028" transform="scale(0.0078125)" />
      </pattern>
      <pattern id="pattern2_3058_67028" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3058_67028" transform="scale(0.0078125)" />
      </pattern>
      <image id="image0_3058_67028" width="128" height="128" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
    </defs>
  </svg>
);

const ZBank = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="40" height="40" rx="20" fill="url(#pattern0_3058_78883)" />
    <rect width="40" height="40" rx="4" fill="white" />
    <rect width="40" height="40" rx="4" fill="url(#pattern1_3058_78883)" />
    <defs>
      <pattern id="pattern0_3058_78883" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3058_78883" transform="scale(0.0078125)" />
      </pattern>
      <pattern id="pattern1_3058_78883" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3058_78883" transform="scale(0.0078125)" />
      </pattern>
      <image id="image0_3058_78883" width="128" height="128" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAfmElEQVR4nOx9C5hUxbVuvXb37vd0z7PnPYCAAgkiqAgJESJGxYigwPAIgaBGb8x3zDnxJjc5X3LuuYkxibkhRhMw8RGjxsTEIFE4atSIbxMioDAiMO/3q9+9X1V1v72rp22BQWammx7umfX5IXTvrqq9/lVrrVq1ahXhnIMJyh+hfA/gvztNAJBnmgAgzzQBQJ5pAoA80wQAeaYJAPJMEwDkmSYAyDNNAJBnmgAgzzQBQJ5pAoA80wQAeaYJAPJMEwDkmSYAyDNNAJBnmgAgz0TOWE+U0lM/ACHMzf40H2o5+61DCE0pRqOXYzixKZ8V4pwLMEZKZ24GNDY2cc4QwhbkfGiwkAMgyzKEuZMDBCHEEoZcSGvW2oUQGQaNRMLBYFCWZcbYKKZCzgGglGKMOzu7f/CjHxNoEkKIpb9mDAAoSRKEgJt/zXb33DRzJgCEZFHBQbNJFInHqK597nNLy8vLR93UGZoBHxz5wO10FhUVUUpPnKqMsZz2zrNnAfiQmA8MDJQHy9avW1dbWy26GJ0lyDkAGGMAwL53DmCMDcPINa+HIzg6DZ1BQssjjBUlGU9EL5p/yerrVgqNOmru5xwAoRZDg5HOrg5ZloUkjpkVZ5oE68WwQ6GQLNs2bfziJz85GwBgGAYhZCxvdCYAONjQEI/Hi4qKRu0q5JHS3Nd1PRQOT5927rp1q31er6XUOCFjZWBuARAT8+B770qSdJb6u4L7sVicMnrtNVdfeumlAAAVAIlRhPDY288hAEL8EwmlsanJ6XSedeLPGMMYU0pDoVAwWLZ23bqqCtPb0QGg+/5JJk0BHs/Ye8khAELkDx16P5FI+P1+xtjZAgDnAEKT+4lEQlGUhQs/dd3KzwOADAC4kVTu3EqWLmYeD7aeG2NfOYwFCf1zqOGg8P3Hsl4/YzTkJpjDHwyFbETatGnzdSuXA4AoAMbB96ILrrTNnmObdyGgDGRDqeZqBgj9o+rsgw+OOJ1OxthZoYKExtc0LRwKz5o1Y/3aNQ6XW7O+Mrb/On7TV11//gO5aik3KIEIoCy8Tk4AEOwGABw9ciQcDgUCgbPC+zSFBuN4PG4YxvWrVnxq4afMlTwAUNUS9evUJ59wPfOM44orqK4TScpWp7maASK2s//AAbEQG8+UOTUH+vurqyrr69cEg0Fhb41XX0uu3Kh3H/Hu2Gm/4gpOKSFZ434OAUCIcA6OHj1it9tz1MXYKb0whBAmE4lEMrlo0WeuXX61ORus0EXif/27fscPOdA8j/9B+vwypmuY4OwGrHICgHix5ubm3p4eoX/GIZmCDwBEiHM+MDDg8flu+sKGc6dPE4KvHz6sbNxivPEqApJr+/22VddBSrFEsu625BCA/fv3C/fnpAG4/FJ6favqejQcOX/2J+rr6+12G7Vk3/j5fert3+aaBoHNduf35Rs2pV4pB05jTgAQC/RDDQ12u01E33K6DB4FusIzjkTCAMBVq65dcMlCYW9ZLJpYu1nbuQMVlbBkTP72N+Tbb6OAS1ZYMReDzz4AIj7V3NLa29vvdrvEgiDriwAhwml3a0S/ErsU/f39dTXV6zesKyoqNqUeAPrM7tiXbkLdvaSqVm9ttd12i/M/v2OOm7IccT8nAIg3fL+hwaCGJEmqIE0zX34oLj8WjWQ1wSDEnDNCiMvlwhh/bINpe4sQTMQTSUW97LLLll11BbBYDwDQvvK15D33QG8RqpnMmhqkG29y/+QuYGEFc+nIZRkAET8BABw8dAgC1NfXJ8tyXV1daUmJw+EQq3ybTcKYjHaDBHKuE0IIJkQiCOLnX/xbLBqRTumYpzW+aW/7BwOBwObNX5wyZQq11A7dty9Rv5kdeg9VVCKbbDQetq1a7d72c9NEUwPi3MYrc9J6X1/f+w3vB4Nll1566Zx5F7hkRy56AQC8vGdPaHBAluVTP5ayt6oajUXnnH9+/Zo1NpvELRFQf/R/lW/9B8QY1dQggPTGo/YrP+98/LfmrwwDjjna/LGU5awIYQB27NjR3t528823pDUDYzRr/XBu7bLjP/955/PPPxcoLiYfZ2A457FYjBBpxbXXzJs311Q4ALCOdmXDDeyFv8LiIHfaIIC8uQ18ZoHjxWcd1puA3HM/+zOAEKJpms/nu+aaawQeKEXZUaNpK/rsc3994aUXi4qLhzPvlvdlSrZO6eDg4PRzptTX1wcCfrHCor/7U/yWr4JIhFTXGZRhSlh7mzR3nnv302Yvug6zF2w4NWU/LyiZTHLOnU6nyIfIbuPChL/0tz1PPvmk3+8/KfdFkFhAFY9FqcGWXr506dLPCkfT0BLKllu1h38L/UXQ5wE6QwTrHZ34nMmeN18kbi9kFGZJXE6Hsg+AaDBtjbNFlkRzhPDrr7/1u8cfLyjwEUKG22OAEFDKQ6FQcZF/3br1tbU1qcDOa68lNt7IjzTCinITPEoBIay7h1cGC159CZUWc8PAZ0TzfDjUXCyRRpeidGoSEr33H/946OFHfD6fJEliiXccAAJ4VVVjsehFF128atUKjEgqsPPt7ya/90Ps8qKiAkYZAoAhyHv6YMDveWsPqQhyg0KCz/CuxdmRmigQfffdgw8+9JDT6RyO+4IikYjdbl9x3fILZs8Rgg+bm2NrNutvvELKKplETMEHCBDCB/qBTXK//ld56jR+RnyeEykPXY6IhJJBCDU0NDz04IOyw3Ei98U/EUKGYViJC1PXrV/j8xSIDCR926+T//pNoGmwppYxjpiVgUcAjwwiCOVnnyJTpzFKUT64fxYAIHKemppafv3AQ5JdttvtJyYXiZydeDzODGP51csWL1ks4sksFolt+jJ94o+8qBgWFmKdAsgARKbVjcawpsrP7LRdMAcaOsrxausUNK4BEH5Ua2vr9u3bCcaybBdpaIL76b8wDsKDg2Vl5evXrq6sqky5+f/1fHzTzbSzA1WUQyQhpgOEAAMMAhBNknDY+fQfbYsWcEPjGI99b33UNH4BENzv6urdtu0+xoHLZfq1CKG07Iv1raIosXh8wfyLr79+JYTIsGRfv+325E/vhR6XVF0FGBUqCkDAEOKaigZ65UcfgpdfDqiOsAQ5zH5S8GnTeASAMUYplSSpr3/g3l/+0jAMl9udeb6DZWTIejyeLZs2z/rEDOHm8wMHEutvoPv3omA1J5gxA3GEILA0PzLXtz298n2/kOtXcUohsLIK87pVMR4B4JxLkhSJRLf9cpuSTHg8HiH76QdS9jYUmjFjRn39Gq/HzS1vR9n6M+PfvmsQiGsmQcohY0LwAQcIIkYN3tUp33WnbcsXrSTncZGlMe4AENGkRCJxzz33Dg4O+goK+Ee5DyGMRCIIwpUrVyz69KeEowl6ehLrb6TP/QWUVGCHDHQDDIm2OHVAAUWdLfb/+I7za19Ned8Q55/9420dIHSLpml33/2zzs5un89POUUQcYuJEELDMKwTKRUb1q8NBstS+7dP7lC33GoMRkllCeMcpQIW1v84YBCaZqCjzX7b11w/uYMCJlGW6yDz6dM4AkDIPqX07p//oq2t1efzZWoeCGE8HlcU9TOLFixffq1wdYCuKDf9i/rAQ8gfAD4vMCjKTBfk0NRBmPGWZnLzra5777JC/LndYBkpjRcA0pG7e++998jRRp/PJ/ZP0mp6cHCgoKBg1fWrzz13qrC32ltvJzbcwA+/zyuCCEkm6zO4b67OEDddz5ZWae1a1yP3m2BQA48b2Rc0LgBIc/+++3713sFDgUAgzXoIoapp0Uh09qxZ9fX1stMu9m+1734v8Z93Qpsdlxaaxtba+c+QfSsgiAltabZds8z1599jU/YZPNORno+n/APAmOUnAvDggw/v/ee+kpJCwzCEqyPsLURg+eevueSS+ULw9daWxLrNxp6XUUkFsEmQMWTyPcObFPMAIaOlRVqyyPn8LgwAymqohzEmeuNjOyScfwDSHv2jjz725ltvBwKFQogte0sHBwdra2s2rK0vLi1hFveVB3+j3fp1qGqwrIxzigDkx+0tm9znDEuspR1fMs/70m5AJKxTKGVN73MLYGrNXGTFqcbSWj4BSGueJ554Ys/LrxYWF3HOOAciMT+pKIsXL/78sitTGTtKIvHFW4zHHwOFxcjlZUwDzJQ+DjIXspxRDmx22N7Oz53mffsFYndxw4DYZFRWxswZowgBRdXbWuUpU0ztNzYA8maRGOeC+zue+ssrr77uLwxYNQUwAHxwcKDQ79+8cdM50yYLb8f46/Pq5lv1liZcUW1KnLm+hSI7/EPuW+kuQMKgq5XXVbteegbaXdTQMLFly983rTznGIDYT35qu2gumDJl7EcE8jMD0gHkXc8+u+vp3YGAX2h8VVWj0egFc2avXr3KbpcNy97qt39L/9FdzO3FhYWA0tQ7H7+I5YxxTjDsG0B+n/ONl2yVldwwOMFZTKZlus4kyXjj1cTia709TcTtBGfpDBB688UX/vZfu54X3EcIhcNhQsjatfUXXThP5EuxQw3K2o30nX/i0kpuk5ium/b2pPEDDpGEWd8gcLjkl3bjykqqqcSWpcRsDjilAEEoScbhY/EFV8IL5wC3Mytt5wEAzhhE6NXXX3/qL08VFBRgjHVdD4fDdXV169evKyoMpOzt3b9Qvv4tE6iayeb7c3qKBAgEMe8dYIy5n/2DPGUKV1WEMTBE0tuHFsJ82NqwP32hZQxAjDnBFADj+eeUtTcyFnEuWWRqT4MCMlbbfkYBSGuet99+6w+//5PX68UYxxMJVVE+d8UVV1x+WSpxob9P33ij9vROWBwEDhey1A46hRXF2FAUXFLoe/EZUltHASDDH0oYqb5AVjSJhgaT//6/tXu2Q38Bxy48ZyY3JWkEQA5HZ3oGIIQO7D/w6GO/9/lM7vf19ZUWF9Vv+VLdpLpUYGfHU+oNX2UDA6BqEuYcMAo+9jAi51g38IUX6P88QJ96DiCunqT2ilW2w7QfDGiUK8qp/SKxtIMIsUSMHngfvPQ6G+yFwXLIObQbYO48buKeBetyhoywKfucI4wPHmx44IEHZZeTUxqLRi+88MI1q65DhBhWPlTyy19Tt/8K+gqA1wc4Q6d3DlRMLKok+cAgShXCGZa5EHAqyp2AYatWQBMAZP0JEESQIODzcrcTMcgiIVJU4vpgv7m4G7MFPnMzAEIOEf7gyNGHfvMbu2xPxuN2u33jxi+cf/7s1NHnv/89sf4m8P57pKLCMJUu+3jBHyKr/g2TnC7g8aYXqCfxfdKShsBQwZzh2udiHwGlJo6p7hllgGAeTeKr5xFhHMbtKclMYhYRQpqbm++//34IcTQanXbu1HWr1/kKPCKwo/6fH6jfuYPYJVpTSw2asmsj2S1Blnox/c6hT07x49MRWnRCO9YnGNAYWbDAnBzMgMh2+iMcjnIOALcqWnR0dt/3qwcTiYTdZl+27KrLPrskFdhp71TWb9ZfegGVlhsOGzb9ltFO6pzub3EOEKKaCokbzZ1rfZSdpXVuSxUYhiFJUl/fwLZt2/r6eiZNnrR21fWV1dWC+8mHH1FvvR3EYqi6FjIOdJ7aQRyXxAHksSSqrkLnzxxjob5MyuFJebG1G41Gf7r1Z9093Usvu2zl8msQweYKS9GVLTepjzyEAqWgIggMI12QZ/wSgjARwYvmY4TEUiYrreYKAG6FemKx+Pfv+GEyqfzLV2+dMeM8sb7V/vayumGL0dqGKiebK1tzqTPM+nY8EQcA6jpausT8Szb8H0HZB0DIPsY4mUx8/3t3FBYW/o+bv+xwOaj1DslvfFu586fQ40A11YgyICqYjXPuC3/MMBjA0sL5ML3lnA3K/jpAbO2GI5GtW7fOmT172dVXC/HRDh+Or/2S8Y83cbCKE+FongWCDwQAhNBQiJQWeQ7uQxiN3xlAKSWEhEKhP/3pyZUrV84477zU+nb7r5TbvskNA1fXmfaWWi9wNjBfRM4h4CAchZ+7HGHEqQ7xeC3WYen9xKFDh1auWOEr8FEA6OBAcuNNys4nUVEQOV3IWhJny4KdObISXPBnL4Wm0sim4GRTBTHKIIbRaNwp24kkGQDoz+xSt9xsdPWjynJg1WY4/fXtuCHOAATU4IP97oYD9ppqSA2QvdSKbEoiRJBTw+V0EUnSAYvfelvsqhVGXIdVFabfdvKNlHFP5goMg2iMzJwp1VRbQY5sMi2bKohRnRFiemvv7I2v28wPNsDySmSaWwON4xXWxxKHCMTicPEiaHmiIKsHKLMCJmOUMsMAxIYB0n7w4+hFi8GxNlw9CULEKT17uc8sC8yoSiG3X3aZMMgsq35jNmwApRxjBoDR2Z1cv5m98BwvKQeyjKiRg2rcZ5SYuNUgkQA2u6+9ASEp65mNY1JB5prLOrRuuvlP/jl5y216OCRNmY4YBTxX9V2GG8rHPHCacnb8YxxgzEMhafVKk/s5qLw5JgA4YAASrakpufkW/cVdEACEXPTIkY8W4oBo2K0P64AR4Kkc/mEeyOhuWIIAW+u6YR/hH5bvPnEwSKgCa9ciM8XObI4hwljcfvkSICIQ2T7LN3oVZKUoQRCLJb9/Fz3YgKvLISTWNkXqHbnY1XO7+DBTwTrOTgGxQ9nGOYTgxMdYiu+EQIHGcQIoDuxxTv0e5PEiNox4ck4JIm6HlXB60l6spCLZwTFGGShysQDQdLzwU8QpZ3EBnKYxAcABoFZcdjhdI4Tt1EPmqS3Ajw5r6KvTed3T6YWdRgCHAvNF0AnDSw2SM1HQ9TRGNAIaPQDpMgGMUihOYJ3AM3FWgg3jNwzpHYYA4hmXi/C0Qkcn2fRjQ/wWj3ORlgIQR6nMiZP2Zk1HZP3O7Mq6TAWlsk4gE7PRKhHxEZhYejYgfLKxZIFGCcBplsEd6YUBIu81M4/nFJNAFJA/Lq4xljhl5m+ZVRTnuLHlYsdiNCZFDCUWiw3dHHH8W0MADOtQo9frFXMlGg1jLJ1wU0/qt3ToYW69diQSRggzxrxe74ccsfKoDYPGYmZTnHOv18usExixWBRCbOiaLDvtsk1RkqqqnlBelWV0CjRNc7u9koTj8TiluiUk2ONxfzgyi9fh8ADGkqbpHo9bkrKwA3wijRgAkdKsJNW7t96t6LqEbWyoEhwHjFPzX4igaCQ8e9aMDRs3AgDee+/dBx542OP1QggR/Ii9sJxVHBkMf3L2zHXr6xFC3d09P7lrq+yUo7HYpo0bZs2aKXoUk2nv3r8/9vjvCZZmzjpv44YvIGTKwZ13/hhAFI1GvvzlG6dPm7bjqWf+8fe9Xq+XWvkAgFuKBMF0zSLOmKYpX//6bX5/4OHfPtp4rJFSfeHCBcuXLxd9CbC7unp+tvUeTLCu61/5yk2VlZW5KEIySqeqqaX1vYYGUZRefAIhlCTJ5XIhU1lCRUkWl5eJr1pb2zVdQwjFYlFRTSijJYQQ6uvrW7L0M+LfbW2tipqUXTLn7NXXXps1a6bIfxJv3tzSxhhXqVJdWS2e7+rqDoUiXp/H4XBUVlQCAP7+j7cHB0NJJc4gl22y0+GAEBq6EY3GLQ7CRCIeLCv1+wMGZR1dXWLvqK6uNj0mMcLW5uZ4IuZyyU6nYyz3JJ2aRgyA0IMOh+3661e63W5ulb5glLldrlAk8sYbb1qVEjWPxz1n9vniJ61t7R6PR1WVaedMnTZ9alJJDsmRQAKqSXWOlSBkQtvUTCTJJhGfx3vs2LGuru6yslLDMEQue3t7p1N2GZTW1tYOPd8oO+yc87Jg0O12aZr2mUWfttQFdzndTY1NBxsO2Ww2m0SWLFls+a1cU7Ti4iIAQE9vXywS8fn8jNNqK1UgU8u3trUTm40DWFFRgawCu7mowD+aGUApramurqmuPu7zRx79nW4YEPBkMn7DDVtKikush42Ojnbr4HVkwcJLzj13+qkb7+zqtK4mAtbcN15//Y1rr71GsCaZTPT19QDInU65rLRUPN/c0ioueCkrLRE106668sp0a6qS3PvPvYyxyZPqliy+9Li+WluaGWO6rvr9/oICv5D9dJ3f1s5Wu01SlWRNTXXujPBoIBXiQKmpYw3DEHL86wd+8+abpviHw+H6NaunT5smjnp1dXUnEgnOocvlGm4iiwQWAEA8keju7pNlm6Zpuq673e6977yTTKqiFG9bW7uq6pxzX4Hf4XRYFVVpb++AZLMZBp1sZZeKgRkGFbrx3YMNdllWVbWiosKyvQal4gGzu2PHGu12u6qqVVVVgrnYIoSQoqvdXT02m40xJgDIEY0YAHGSwooAYQihyRoInnjij/v3vVNUVBQOhVasWDl37tz0KuHYsUarWAYrKAg4nE7D0HVdS/+nalo8FktXO+7u7onHY5TSYDBYWlpCDSMWjb719lui66amZkapNf9qxCf9/f2DgwMSIZjAautDMTCLh0hV1Z6ebouJoM5SWeaaEZsPDCHahhDCGAcKApyz0OBgOBwOhQZVRTv8/mFd1xmjTpdTlLLPEY0tFmTNyt3PPbdnz2v+gH9gYGDpZxd/+tMLMydsW1sn4EiySfF47Ac/uFNVtfSvgXXyHUJ4+7/9ayBgaoDGphZL1STrJk86Z3Ld1q0/d7ndb735lihJ0NLSjjHWqD6pLiWSbW1dqpqw220FPn9hUWF6YKJwWWdXl6IknU6Xy+UstY7VDy2+mDgPEglFbTaCCX7tjTde3rPHYFSoGCFhbpc7kUhUBMvdbncWM7GOo1ECkM70f/W113bv2uUP+MPh8MXz51+1bFnm6TsAeFdnh122cUYT8aRu6Jk36SGE4vF4dVVNIOAXP2lqbCKE6LpeFAhMnjQ5ECiiVG/v6Pjg8JFzpk7pbG8nkg0iGCxPieTRo0clya4oSl1dHbYYlMmmpsZjnANdNwoLC/0FBelvhZPT3t4ZiUWKigKqqiaTivVWVuCQc0KwLDswNk1LSVnZR98oyzTaGcAZwmTf/v1PPPGk3+cPhyIzZ85Ys+q6dEqWGHEkGu3q6ZVlm6rq8y66wOf1aZoxlJhvOhXJpFpRXpq+8bC7u0u44eWWwM694PwX//YyIeTNt9+urq0JRcOSJPn9fmHeLUelVZIkRVGCwfJMNglGt7R2QogY08uCH2Fiysa2tYnrYgoDhQsXLrTWDJxzZpNsiqa/8MJfKTU453WTanOadzpKLwhjcuTosUceedztcUVjsUmT6770pU3ppKD04cW2jnZdV+12yeFwXL/yuuEaFDqht7cvEokQAj0eT1mZicr8S+bveeUVQkhTU9OuXbudTmcikSguLhVhmWRSCYdCQt9XV1cd1xoAoKOjQ5bt8Xj0nMmTM7sbMk5HZdkei8UvufiSefMuyHwgnkg+/fROu91OCKmtqRkFi06fRqzXhtRr9/33PyBJOJlIFgYCW7ZsFtyHEFpmkloFksDRD5pE9ZOiItPvVjXFOIEopSmd0NGhKEnDMMrLK8QlmYUB//Tp05NJ88O9e/cSQgzDqKmrFCNpb2+PRqMQQrvdXlvzoRcvWhsMDfT19RFCMERVVRXpb9PeQXd3r7jfr7S02HKQVEqpppkmquHw+/F4XMRCigtzewPIyAAQwhWJRrdvv098UllR+c1v/E9RPtt82yES86CzvQNjbFA647xzAQB2m0xOINObsqZLU3OTFXgxaixxproOAFi4cIEwiqmJBWHdkEi2tbUJV9jv9zstrzTTALS0dVBqUMp8/kBRUfFxL9LR0ZFMJCACsuwQ2dqESGLkpi9wtFGW5WQyGQyWIUsljpnPw9IIVFDqajBNu3fbL6PRmNfr0TTt4vkX9/T0hSMDCKWb4omEMmXKJIfD0dlteoFiRrS3dyQSiUwecc5VTSnwFQgnvaW5WZKwofPKSktgLV6cM2VyVWVFV2+vx2Wucp1OZ9mQU9jc3CK8eLEkTGs/QY3HGq3zl1pFZYXNJqXjz0P327Tohmbjdo/HXWKtilGGDW9rayOEKIpSWVUlXnzsl3YORyNoN3UzzL597c1tZcGgKOu2Y+fORCyGrDgnGwpvxiLRO+74vq5rodBAQYEfIbx79+6nntIY55mxdkRQ38BA/arrKyoqFEXt7x+EEMkOuaKyXAi7MJsXz7/oscd+77XCDJUVFS5H6oBuS2ubLDvC4VBtbVXmOFNMbG2TJEnXtAorQMRYal9uiMXmeltT1cmTJmXex2H5BcnBgQEiSUjTaiwAcnoH4AgAEKrz6NGjSUWJRMLMYMwqF5BZvh9CoGlaaWlJSUnRK6+8EgpFbDZRZxXZbMeHcznnbqfzPEs7HW1s7OntRQgEy4JejzdzI+H8ORfs3PmX/v7+eDzxiVmzxG/b2zs6uzpkm50xVlYWzFTxCKHBUKipucXQNVVVqy0mZn7LOWhoOKTrejQaqaysTBs20emRI0e6OrtcHjcAUICXUxrxhkxj47F4PC5JtnQCwUc24K2dALvdPmXKlI6Ojv6+PttQqdWT9A0AZWzq1KmEkN7e3s7OToyxy+VKB9rSstnc1BSNxRhjwWC5iKOFw+FmU2VJAICpU6emnfShK1wTR48csUIUxtSpU4/DnlJ66NAhQoiqapMm1Xk8HvEr8WdfX19bW5vdbocQTJ9+7oiYMwoaGQC5CIifupf0ii/z21Mfpzl11OzETbrMLs7MC2bSiGdAZv3OYRu1quic5hVHQnjTD8OTVeBJd5r+NrPx0/xJJp2iu1OPJOuU/4pZ/83pbMvT//+OJgDIM00AkGeaACDPNAFAnmkCgDzTBAB5pgkA8kwTAOSZJgDIM00AkGeaACDPNAFAnmkCgDzTBAB5pgkA8kwTAOSZ/l8AAAD//0ECUYH5v9SzAAAAAElFTkSuQmCC" />
    </defs>
  </svg>
);

export default function PayoutSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.card}>
        <h3 className={styles.title}>Payout Accounts</h3>

        <div className={styles.accountsList}>
          <div className={styles.accountRow}>
            <div className={styles.accountInfo}>
              <GTCO />
              <div className={styles.accountDetails}>
                <span className={styles.bankName}>GTBank</span>
                <span className={styles.accountNumber}>••••••2345</span>
              </div>
            </div>
            <div className={styles.accountActions}>
              <span className={styles.defaultBadge}>Default</span>
              <button className={styles.deleteBtn} aria-label="Delete account">
                <TrashIcon />
              </button>
            </div>
          </div>

          <div className={styles.accountRow}>
            <div className={styles.accountInfo}>
              <ZBank />
              <div className={styles.accountDetails}>
                <span className={styles.bankName}>Zenith Bank</span>
                <span className={styles.accountNumber}>••••••2345</span>
              </div>
            </div>
            <div className={styles.accountActions}>
              <button className={styles.setDefault}>Set as default</button>
              <button className={styles.deleteBtn} aria-label="Delete account">
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>

        <button className={styles.addAccount}>
          <PlusIcon /> Add another account
        </button>
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Payout schedule</h3>

        <div className={styles.scheduleList}>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Next payout date</span>
            <span className={styles.scheduleValue}>Apr 30, 2026</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Projected amount</span>
            <span className={styles.scheduleValue}>$234,000</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Payout account</span>
            <span className={styles.scheduleValue}>GTBank •••• 4821</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleLabel}>Payout frequency</span>
            <span className={styles.scheduleValue}>Monthly</span>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Minimum Payout</span>
            <span className={styles.progressValue}>$200</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: "15%" }}></div>
          </div>
          <div style={{ textAlign: "right", marginTop: "-4px" }}>
            <span className={styles.progressValues} style={{ fontSize: "10px" }}>15%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

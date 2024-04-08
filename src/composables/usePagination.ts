import type { PaginatorLink } from '@/types/PaginatorLink'
import type { PaginatorProps } from '@/types/PaginatorProps'
import type { PaginationOptions } from '@/types/PaginationOptions'
import { onMounted, reactive, ref, watch } from 'vue'

export const usePagination = (paginatorProps: PaginatorProps) => {
  const props = reactive(paginatorProps);

  const links = generateLinks(2, 2, props.current_page, props.last_page);
  const hasPrevious = props.current_page > 1;
  const hasNext = props.current_page < props.last_page;

  return { links, hasPrevious, hasNext }
}

export const usePaginator = (cookieKey: string, defaultPerPage = '25') => {
  const options = ref<PaginationOptions>({
    per_page: Number(localStorage.getItem(cookieKey) || defaultPerPage),
    page: 1,
    search: ''
  });

  const pageOptions = ['10', '25', '50', '100'];

  onMounted(async () => {
    options.value.per_page = JSON.parse(localStorage.getItem(`${cookieKey}_per_page`) || defaultPerPage);
  });

  watch(() => options.value.per_page, async (newValue) => {
    localStorage.setItem(`${cookieKey}_per_page`, JSON.stringify(newValue));
  }, {immediate: false});

  watch(() => [options.value.search, options.value.per_page], () => {
    options.value.page = 1;
  });

  return { options, pageOptions };
}

function generateLinks(eachSide: number, leader: number, page: number, last: number): PaginatorLink[] {
  const hasManyPages = last > (eachSide + leader) * 2 + 4;
  const isNearBeginning = page < leader + eachSide + 3;
  const isNearEnd = page > last - (3 + eachSide + leader);

  const links: PaginatorLink[] = [];
  if (!hasManyPages) {
    for (let i = 1; i <= last; i++) {
      links.push(makeLink(i.toString(), i, i == page))
    }
  } else {
    if (isNearBeginning) {
      for (let i = 1; i <= leader+(eachSide*2)+2; i++) {
        links.push(makeLink(i.toString(), i, i == page))
      }
      links.push(makeLink('...', undefined, false))

      // Add the last 2 pages
      for (let i = last - 1; i <= last; i++) {
        links.push(makeLink(i.toString(), i, i == page))
      }
    } else {
      for (let i = 1; i <= 2; i++) {
        links.push(makeLink(i.toString(), i, i == page))
      }
      links.push(makeLink('...', undefined, false))

      if (isNearEnd) {
        for (let i = last - (leader + (eachSide * 2) + 1); i <= last; i++) {
          links.push(makeLink(i.toString(), i, i == page))
        }
      } else {
        for (let i = page - eachSide; i <= page+eachSide; i++) {
          links.push(makeLink(i.toString(), i, i == page))
        }
        links.push(makeLink('...', undefined, false))
        for (let i = last - eachSide+1; i <= last; i++) {
          links.push(makeLink(i.toString(), i, i == page))
        }

      }
    }
  }
  return links;
}

function makeLink(label: string, value: number | undefined, current: boolean): PaginatorLink {
  return { label, value, current }
}

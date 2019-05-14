module.exports = {
  async getAllButterPost(butter) {
    const page_size = 100; // ButterCMS limit is 100

    let {
      data: { data: list, meta }
    } = await butter.post.list({ page_size, page: 1 });

    if (!meta.next_page) {
      return list;
    }

    const promiseCount = Math.ceil((meta.count - page_size) / page_size);

    const promises = Array.from({ length: promiseCount }, (_, idx) =>
      butter.post.list({ page_size, page: idx + 2 }).then(({ data: { data: list } }) => list)
    );

    return list.concat(...(await Promise.all(promises)));
  }
};

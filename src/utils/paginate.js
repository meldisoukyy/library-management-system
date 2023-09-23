const getOffsetAndLimitAndPage = (page, limit) => {
	if (page < 1 || page == null) {
		page = 1;
	}
	if (limit < 1 || limit == null) {
		limit = 1;
	}

	if (limit > 100) {
		limit = 100;
	}
	const offset = (page - 1) * limit;
	return { offset, limit, page };
};

const getPaginateInfo = (count, page, limit) => {
	const { offset, limit: _limit, page: _page } = getOffsetAndLimitAndPage(page, limit);
	const paginate = {
		total: count,
		pages: Math.ceil(count / _limit),
		currentPage: _page,
		nextPage: _page + 1 > Math.ceil(count / _limit) ? null : _page + 1,
		perviousPage: _page - 1 < 1 ? null : _page - 1,
	};
	return paginate;
};

module.exports = {
	getOffsetAndLimitAndPage,
	getPaginateInfo,
};

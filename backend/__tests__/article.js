const { deleteArticle,getArticles } = require('../controllers/article');
const articleService = require('../services/article');
const { mockRequest, mockResponse } = require('mock-req-res');

jest.mock('../services/article'); // Mocking the service module

describe('deleteArticle Controller', () => {
    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
    });

    it('should return the deleted article if it exists', async () => {
        const article = { pid: '123', title: 'Test Article' };
        articleService.deleteArticle.mockResolvedValue(article);

        const req = { params: { pid: '123' }, user: {} };
        await deleteArticle(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(article);
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next with a 404 error if the article is not found', async () => {
        articleService.deleteArticle.mockResolvedValue(null);

        const req = { params: { pid: '123' }, user: {} };
        await deleteArticle(req, res, next);

        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            status: 404,
            message: 'Article not found',
        }));
    });
});

describe('getArticles Controller', () => {
    it('should return feed posts when user is authenticated', async () => {
        const req = {
            user: { _id: 'userId', friends: ['friendId'] },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Mock the service to return a list of feed posts
        articleService.getFeedPosts = jest.fn().mockResolvedValue([{ pid: '123', title: 'Test Post' }]);

        // Call the controller
        await getArticles(req, res, next);

        // Assert that the response was sent with status 200 and the correct data
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ pid: '123', title: 'Test Post' }]);
        expect(next).not.toHaveBeenCalled();
    });

    it('should throw a 401 error if the user is not authenticated', async () => {
        const req = { user: null };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Call the controller
        await getArticles(req, res, next);

        // Assert that the next middleware is called with a 401 error
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401, message: 'Unauthorized' }));
    });
});


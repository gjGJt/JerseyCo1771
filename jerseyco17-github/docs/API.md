# JerseyCo17 API Documentation

Complete API documentation for JerseyCo17 e-commerce platform with price comparison capabilities.

## Base URL
```
https://jerseyco17.com/api
```

## Authentication
Currently, the API is public. Future versions may require authentication for certain endpoints.

## Rate Limiting
- **General API**: 100 requests per minute
- **Scraping API**: 10 requests per minute
- **Price Comparison**: 50 requests per minute

## Scraping Endpoints

### GET /scrape
Scrape products from competitor stores.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | string | No | Store to scrape (mizojerseyhome, zealevince, nike, adidas) |
| `category` | string | No | Product category to scrape |

**Example Request:**
```bash
curl "https://jerseyco17.com/api/scrape?store=mizojerseyhome&category=streetwear"
```

**Example Response:**
```json
{
  "success": true,
  "store": "mizojerseyhome",
  "category": "streetwear",
  "productCount": 175,
  "products": [
    {
      "name": "The North Face Green Puffer Jacket",
      "price": 2599,
      "originalPrice": 4000,
      "discount": 35,
      "image": "https://mizojerseyhome.in/image.jpg",
      "url": "https://mizojerseyhome.in/product/123",
      "brand": "The North Face",
      "category": "streetwear",
      "inStock": true,
      "sizes": ["S", "M", "L", "XL"],
      "colors": ["Green", "Black"],
      "scrapedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "scrapedAt": "2024-01-01T00:00:00.000Z"
}
```

### POST /scrape
Start background scraping.

**Request Body:**
```json
{
  "store": "mizojerseyhome",
  "category": "streetwear",
  "schedule": "0 */6 * * *"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scraping started for mizojerseyhome",
  "scheduledAt": "2024-01-01T00:00:00.000Z"
}
```

## Price Comparison Endpoints

### GET /price-comparison
Get price comparisons for products.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product` | string | No | Product name to compare |
| `brand` | string | No | Brand filter |
| `category` | string | No | Category filter |

**Example Request:**
```bash
curl "https://jerseyco17.com/api/price-comparison?product=nike+jersey&brand=nike"
```

**Example Response:**
```json
{
  "success": true,
  "comparisons": [
    {
      "productId": "nike_jersey_1",
      "productName": "Nike Basketball Jersey",
      "ourPrice": 2999,
      "competitorPrices": [
        {
          "store": "mizojerseyhome",
          "price": 2599,
          "originalPrice": 4000,
          "discount": 35,
          "url": "https://mizojerseyhome.in/product/123",
          "inStock": true,
          "lastUpdated": "2024-01-01T00:00:00.000Z"
        }
      ],
      "bestPrice": {
        "store": "mizojerseyhome",
        "price": 2599,
        "originalPrice": 4000,
        "discount": 35,
        "url": "https://mizojerseyhome.in/product/123",
        "inStock": true,
        "lastUpdated": "2024-01-01T00:00:00.000Z"
      },
      "savings": 400,
      "priceHistory": [
        {
          "date": "2024-01-01T00:00:00.000Z",
          "price": 2599,
          "store": "mizojerseyhome"
        }
      ]
    }
  ],
  "totalComparisons": 1,
  "scrapedAt": "2024-01-01T00:00:00.000Z"
}
```

### POST /price-comparison
Start price comparison analysis.

**Request Body:**
```json
{
  "productName": "Nike Basketball Jersey",
  "brand": "Nike",
  "category": "sports-jerseys"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Price comparison started",
  "scheduledAt": "2024-01-01T00:00:00.000Z"
}
```

## Product Endpoints

### GET /products
Get all products with filtering and pagination.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 20) |
| `category` | string | No | Filter by category |
| `brand` | string | No | Filter by brand |
| `minPrice` | number | No | Minimum price filter |
| `maxPrice` | number | No | Maximum price filter |
| `sortBy` | string | No | Sort field (name, price, rating, newest) |
| `sortOrder` | string | No | Sort order (asc, desc) |

**Example Request:**
```bash
curl "https://jerseyco17.com/api/products?category=sports-jerseys&brand=nike&sortBy=price&sortOrder=asc"
```

**Example Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "nike_jersey_1",
      "name": "Nike Basketball Jersey",
      "description": "Premium basketball jersey with advanced moisture-wicking technology",
      "price": 2999,
      "originalPrice": 3999,
      "discount": 25,
      "images": [
        "https://jerseyco17.com/images/nike-jersey-1.jpg"
      ],
      "category": "sports-jerseys",
      "subcategory": "basketball",
      "brand": "Nike",
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "colors": ["Red", "Blue", "Black"],
      "inStock": true,
      "rating": 4.5,
      "reviewCount": 128,
      "tags": ["basketball", "jersey", "nike", "sports"],
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### GET /products/{id}
Get a specific product by ID.

**Example Request:**
```bash
curl "https://jerseyco17.com/api/products/nike_jersey_1"
```

**Example Response:**
```json
{
  "success": true,
  "product": {
    "id": "nike_jersey_1",
    "name": "Nike Basketball Jersey",
    "description": "Premium basketball jersey with advanced moisture-wicking technology",
    "price": 2999,
    "originalPrice": 3999,
    "discount": 25,
    "images": [
      "https://jerseyco17.com/images/nike-jersey-1.jpg"
    ],
    "category": "sports-jerseys",
    "subcategory": "basketball",
    "brand": "Nike",
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colors": ["Red", "Blue", "Black"],
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 128,
    "tags": ["basketball", "jersey", "nike", "sports"],
    "featured": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Health Check

### GET /health
Check API health status.

**Example Request:**
```bash
curl "https://jerseyco17.com/api/health"
```

**Example Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "scraping": "active",
    "priceComparison": "active"
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid request parameters
- `SCRAPING_FAILED`: Web scraping failed
- `PRODUCT_NOT_FOUND`: Product not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## Rate Limiting

Rate limits are applied per IP address:

| Endpoint | Limit | Window |
|----------|-------|--------|
| General API | 100 requests | 1 minute |
| Scraping | 10 requests | 1 minute |
| Price Comparison | 50 requests | 1 minute |

When rate limit is exceeded, you'll receive a `429` status code with:
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 60
}
```

## Webhooks

### Scraping Complete
Sent when scraping job completes.

**Payload:**
```json
{
  "event": "scraping.complete",
  "data": {
    "store": "mizojerseyhome",
    "category": "streetwear",
    "productCount": 175,
    "duration": 30000,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Price Alert
Sent when significant price changes are detected.

**Payload:**
```json
{
  "event": "price.alert",
  "data": {
    "productId": "nike_jersey_1",
    "productName": "Nike Basketball Jersey",
    "oldPrice": 2999,
    "newPrice": 2599,
    "change": -400,
    "changePercent": -13.3,
    "store": "mizojerseyhome",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://jerseyco17.com/api',
  timeout: 10000
});

// Get price comparison
async function getPriceComparison(productName) {
  try {
    const response = await api.get('/price-comparison', {
      params: { product: productName }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response.data);
  }
}
```

### Python
```python
import requests

class JerseyCo17API:
    def __init__(self, base_url='https://jerseyco17.com/api'):
        self.base_url = base_url
        self.session = requests.Session()
    
    def get_price_comparison(self, product_name):
        response = self.session.get(
            f'{self.base_url}/price-comparison',
            params={'product': product_name}
        )
        return response.json()
```

### PHP
```php
<?php
class JerseyCo17API {
    private $baseUrl = 'https://jerseyco17.com/api';
    
    public function getPriceComparison($productName) {
        $url = $this->baseUrl . '/price-comparison?' . http_build_query([
            'product' => $productName
        ]);
        
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
}
?>
```

## Support

For API support:
- 📧 Email: api-support@jerseyco17.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/jerseyco17/issues)
- 📖 Documentation: [API Docs](https://github.com/your-username/jerseyco17/blob/main/docs/API.md)

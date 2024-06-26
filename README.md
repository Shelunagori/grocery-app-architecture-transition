# Grocery App Architecture Transition

🛒 Welcome to the Grocery App Architecture Transition! 🎉

This repository presents a practical demonstration of transitioning from a Monolithic application to a Microservices Architecture using NodeJS. Our primary goal is to provide a detailed understanding of how this transition was accomplished, highlighting the challenges addressed along the way to achieve a robust Microservices Architecture within the NodeJS ecosystem.

## Overview

The shift from a monolithic architecture to a microservices-based one is paramount for enhancing the scalability, flexibility, and maintainability of modern applications. By decomposing the application into smaller, loosely-coupled services, we aim to enhance agility, facilitate independent deployment and scaling of components, and strengthen fault isolation.

## Architecture Overview

### Monolithic Architecture
![Monolithic Architecture](https://github.com/Shelunagori/grocery-app-architecture-transition/blob/main/assets/monolithic-architecture.png?raw=true)

### Microservices Architecture
![Microservices Architecture](https://github.com/Shelunagori/grocery-app-architecture-transition/blob/main/assets/microservices%20architecture.png?raw=true)

### Microservices with message broker and nginx
![Message Broker](https://github.com/Shelunagori/grocery-app-architecture-transition/blob/main/assets/message-broker.png?raw=true)

## Functional Requirements

1. **Listing of Available Products**: Display a comprehensive list of products available for purchase.
2. **User Signup / Signin**: Allow users to create accounts or sign in to existing ones.
3. **Add Product to Cart**: Enable users to add products to their shopping carts for checkout.
4. **Add Product to Wishlist**: Provide functionality for users to add products to their wishlist for future reference.
5. **Place an Order**: Allow users to place orders for the selected products.
6. **View Orders**: Enable users to view their order history and current order status.

## Branches

You can explore the merged code in the `main` branch. For specific architectural views, you can navigate to the following branches:

- For **Monolithic architecture**, visit the `monolithic` branch.
- For **Microservices architecture**, check out the `microservices` branch.
- For **Microservices with message and ngnix**, check out `microservices_message_broker` branch.

Feel free to explore the code and branches to gain insights into our architecture transition journey!

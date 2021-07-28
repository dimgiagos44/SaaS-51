# SOA implementation of AskMeAnything
The app is broken in 6 main components - services.

These are: 

1. [Frontend](https://github.com/dimgiagos44/SaaS-51/tree/master/soa-askme-anything/frontend)
2. [Enterprise Service Bus](https://github.com/dimgiagos44/SaaS-51/tree/master/soa-askme-anything/esb)
3. [Data layer](https://github.com/dimgiagos44/SaaS-51/tree/master/soa-askme-anything/backend)
4. [QA_management](https://github.com/dimgiagos44/SaaS-51/tree/master/soa-askme-anything/qa_management)
5. [Authentication](https://github.com/dimgiagos44/SaaS-51/tree/master/soa-askme-anything/authentication)
6. [QA_statistics](https://github.com/dimgiagos44/SaaS-51/tree/master/soa-askme-anything/qa_statistics)

The **Frontend** communicates with the **Backend** services throught the **ESB**.

* Frontend port: 3000
* ESB port: 4200 
* Data layer: 3001
* QA_management: 4000
* Authentication: 4001
* QA_statistics: 4002
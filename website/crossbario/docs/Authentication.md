With Crossbar.io, *authentication* and *authorization* of WAMP connections are orthogonal aspects which can be configured on transports and routers running on a node.

WAMP *authorization* is described [here](Authorization). This chapter is about *WAMP authentication* concepts and configuration.

## Introduction

Crossbar.io supports authentication via:

 1. [**Mozilla Persona**](Mozilla Persona) (currently broken)
 2. [**WAMP Challenge-Response (WAMP-CRA)**](WAMP CRA Authentication)
 3. [**Cookie**](Cookie-Authentication)
 3. [**One-time-token based**](OTP-Authentication) (e.g. for Google Authenticator) 
 3. **Client TLS Certificates** *(under develeopment)*

and can additionally assign a role to components which don't authenticate:

* [Anonymous Authentication](Anonymous Authentication)

During (successful) authentication, Crossbar.io will determine an **authid** for the client connecting.
The **authid** is then mapped to an **authrole**, and the **realm** together with the **authrole** will determine the permissions the client will have.

In case of Mozilla Persona, the **authid** will be the email address of the authenticated user.
In case of client TLS certificates, the **authid** will be the Common Name ("CN") of the certificate, most likely the fully qualified domain name of the host connecting.

In addition to credentials defined in the Crossbar.io configuration, some authentications methods allow for dynamic authentication, where you define a WAMP component as the authentication handler.


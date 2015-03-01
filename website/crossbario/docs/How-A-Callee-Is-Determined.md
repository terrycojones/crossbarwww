With pattern-based subscriptions comes the possibility of having multiple registrations match the URI of a call. For example, given the registrations

a. `com.myapp.manage.47837483.create` - match: "exact"
b. `com.myapp` - match: "prefix"
c. `com.myapp.manage` - match: "prefix"
d. `com.myapp.manage...` - match: "wildcard"
e. `com.myapp...create` - match: "wildcard"

a call to 

`com.myapp.manage.47837483.create` 

would in principle match all five registrations. 

Since we want only a single callee to be invoked, there is a need to determine which registration takes precedence.

This is determined by first a hierarchy of matching policies, and then a determination within the prefix or wildcard matches.

## Hierarchy of Matching Policies

The hierarchy is simply:

1. Exact match
2. Prefix match
3. Wildcard match

This means that a registration using prefix matching can only apply when there is no registration with an exact match for the call URI, and that a registration using wildcard matching can only apply when there is neither an exact match nor a prefix match for the call URI. 

In the initial example, registration a. would apply.
Registrations b. and c. could only apply absent registration a..
Registrations d. and e. could only apply abesent registrations a. - c..

Crossbar.io internally checks following this hierarchy. The rules below for prefix matching respectively wildcard matching are only checked if no match is found at the higher level(s) of the hierarchy.

## Longest Prefix Match Wins

If there are multiple registrations using prefix matchin which would in principle match (but no exact matching registration), then the longest of these prefixes wins. 

In the initial example, among registrations b. and c., registration c. would apply since it is longer.

## Wildcard Matches

A conflict resolution for wildcard matches has yet to be specified and implemented.


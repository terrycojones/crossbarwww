We provide a [**Crossbar.io on Azure Virtual Machine Image**](https://vmdepot.msopentech.com/Vhd/Show?vhdId=49990&version=51102) on [VM Depot](https://vmdepot.msopentech.com/) to make setup on [Microsoft Azure](http://azure.microsoft.com/) as simple as possible. The image has Crossbar.io running on [Ubuntu Server 14.04 LTS](https://insights.ubuntu.com/2014/04/17/whats-new-in-ubuntu-server-14-04-lts/).

If you want to install Crossbar.io from scratch, or run it on a different OS, see the [instructions for installation](Home#Installation).

## Prepare the image

You first need to create a copy of the image we provide in a storage container of your own, and register this for usage with a virtual machine.

To do so:

1. In the Azure management console, go to 'Virtual Machines', and there to the 'Images' tab.
2. At the bottom of the screen, select 'Browse VM Depot'.
3. Scroll down the list & select the Crossbar.io image. ![Crossbar.io in VM Depot](/static/img/docs/azure_01.png)
4. Select an image region & storage account. If you've not previously done so, you may need to create a new storage account.
5. Wait for the image to be copied into the storage account. This can take a while (up to half an hour). The Crossbar.io VM Depot image is stored on all storage regions, so which region you choose should not influence the copying time much, if at all.
6. Register the image by selecting it and clicking on 'Register' at the bottom of the screen.

## Create the machine

Now create a virtual machine using the image that you just copied.

1. At the bottom of the images screen press 'New'.
2. The dialog which opens should have 'Compute' and 'Virtual Machine' pre-selected.
3. Select 'From Gallery' to access the images.
4. Select 'My Images', and then the Crossbar.io image.
5. Fill in the required information. *Note regarding keys: You need a key for the SSH connection into the virtual machine. Azure currently only accepts SSH public keys that are encapsulated in a X.509 certificate. Microsoft provides a decent [how to](http://azure.microsoft.com/en-us/documentation/articles/virtual-machines-linux-use-ssh-key/) for handling this inconvenience. Don't be fooled by the fact that the wizard seemingly accepts any key file here with a 'cer' or 'pem' file type - there's no actual check until later, and the creation of the machine fails entirely at that point!*
6. Create a cloud service and add a HTTP endpoint. The demos and application templates which Crossbar.io provides are served on port 8080, so best add this.

![Add HTTP Endpoint](/static/img/docs/azure_02.png)

Once you finish the creation, the machine now starts up automatically, which takes a few minutes.

## SSH into the machine

Now connect to the machine via SSH software of your choice.

You can find the public DNS hostname of your machine in the administration console **Virtual Machines -> Instances -> Click on the instance**, select "Dashboard", information is on the right-hand side.

The user name is 'azureuser', unless you changed it during the creation of the machine.

Once you've logged into the machine, you can set up Crossbar.io using the [command line](First Steps). For example, to set up the votes demo and run it, do

```
crossbar init --template votes:python --appdir votes_python
cd votes_python
crossbar start
```

You can then access the demo from any (modern) browser by opening `http://<your Azure instance hostname>:8080`.

## Updating Crossbar.io

Since Crossbar.io is under active development, the version of Crossbar installed in the image will often lag behind. There are two ways of updating Crossbar.io:

### Update to latest release

You can udpate to the latest release version using `pip` (a Python package manager). Simply do

```
pip install -U crossbar
```

### Update to trunk

To get the most current development version of Crossbar.io - which might be broken any time - you can update from the GitHub repository. Git is already installed and the repository is cloned into `crossbar_source`.  To update do

```
cd crossbar_source
git pull
cd crossbar
python setup.py install
```

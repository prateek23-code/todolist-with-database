s="aab"
m=set(s)
v=list(m)
t=0
r=0
c=0
a=0
f=[]
max=0
d={}
x={}
for i in s:

    if i not in f:
    	d[i]=c
    	f.append(i)
    c=c+1
for i in range(0,len(s)-1):
            if d[s[i]]-d[s[i+1]]==-1:
                t=t+1
                if t>max:
                	max=t
             
            
            	 
            		
print(d)
print(max+1)



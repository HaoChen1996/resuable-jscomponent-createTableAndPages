# resuable-jscomponent-createTableAndPages
This is a javascript component for automatic generate tables and pages.

This repository contains:

1.A singel javascript with no dependiences, you can directly add it into your project.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)

## Background

Many administrator applications will need to create tables and divide by pages(could be 10 rows per page or 20 rows per page),
Usually we use AJAX to get JSON format data from server, but problem is how to put data in the right cell and how to 
demonstrate data in the right format(for example: Date),what if you have a long text that cannot fit in one cell?

here is my js can solve this problem.

## Install

Actually it's pretty simple you just have to drag this file into your project current location,and import it.
```javascript
<script type="text/javascript" src="../js/table&page.js"></script>
```

## Usage

To use this js component,you need to predefine a javascript variable with certen format,For example :

```javascript
var columns=[
		{field:'id',title:'ID',width:'30',type:'text'},
		{field:'username',title:'用户名',width:'80',type:'text'},
		{field:'providerName',title:'商家名称',width:'80',type:'text'},
		{field:'supName',title:'所属大类',width:'80',type:'text'},
		{field:'shopSub',title:'所属小类',width:'80',type:'text'},
		{field:'areaName',title:'所属区域',width:'80',type:'text'},
		{field:'cname',title:'认证类型',width:'80',type:'text'},
		{field:'homeDelivery',title:'上门服务',width:'80',type:'text'},
		{field:'deadline',title:'认证到期时间',width:'50',type:'text'},
		{field:'createdTime',title:'创建时间',width:'50',type:'text'},
		{field:'order',title:'排序',width:'50',type:'select'},
		{field:'checked',title:'审核',width:'50',type:'checked'},
		{field:'operate',title:'操作',width:'80',type:'operate'}
	]
  ```
 There are 4 elements : field, title,width and type:
 
 | Name     |   Description    |
 | -------- |  ------------------------------------------------------------------------------------------------------------- |
 | filed    |  The origin of your data,which probably get from your dataframe or database,later on you can customized your data format |
 | title    | the title you want to show on columns head |
 | width    | the width(length) of each column           |
 | type     | this could be text or date or your customized type |
 
 
